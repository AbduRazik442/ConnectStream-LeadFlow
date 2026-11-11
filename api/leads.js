import process from "node:process";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    const {
      fullName,
      companyName,
      email,
      phone,
      website,
      industry,
      service,
      message,
    } = req.body || {};

    // Validate required fields
    if (
      ![fullName, companyName, email, phone, industry, service]
        .every((value) => typeof value === "string" && value.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Validate phone
    const phoneDigits = phone.replace(/\D/g, "");

    if (
      !/^\+?[0-9\s().-]+$/.test(phone) ||
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number.",
      });
    }

    // Validate optional website
    if (website && website.trim()) {
      let parsedUrl;

      try {
        parsedUrl = new URL(website.trim());
      } catch {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid website URL.",
        });
      }

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        return res.status(400).json({
          success: false,
          message: "Website must use HTTP or HTTPS.",
        });
      }
    }

    // Get n8n Production Webhook URL
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      throw new Error("n8n webhook URL is not configured.");
    }

    // Prepare data for n8n
    const leadData = {
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: companyName.trim(),
      message: typeof message === "string" ? message.trim() : "",
      service: service.trim(),
      website: website?.trim() || "",
      industry: industry.trim(),
      created_at: new Date().toISOString(),
    };

    // Send data to n8n
    const n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });

    const responseText = await n8nResponse.text();

    console.log("n8n response status:", n8nResponse.status);
    console.log("n8n response:", responseText.slice(0, 1000));

    let result = {};

    try {
      result = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error("n8n returned an invalid response.");
    }

    if (!n8nResponse.ok || result.success === false) {
      throw new Error(
        result.message || "Unable to submit your inquiry."
      );
    }

    return res.status(200).json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
    });

  } catch (error) {
    console.error("Lead submission error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to submit your inquiry.",
    });
  }
}
