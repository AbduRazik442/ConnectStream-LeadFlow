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
      typeof fullName !== "string" ||
      typeof companyName !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string" ||
      typeof industry !== "string" ||
      typeof service !== "string" ||
      !fullName.trim() ||
      !companyName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !industry.trim() ||
      !service.trim()
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

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    const apiSecret = process.env.LEAD_API_SECRET;

    if (!scriptUrl || !apiSecret) {
      throw new Error("Server integration is not configured.");
    }

    // Send data to Google Apps Script
    const googleResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName.trim(),
        companyName: companyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        website: website?.trim() || "",
        industry: industry.trim(),
        service: service.trim(),
        message:
          typeof message === "string" ? message.trim() : "",
        secret: apiSecret,
      }),
    });

    const responseText = await googleResponse.text();
    console.log("GOOGLE RAW RESPONSE:", responseText.slice(0, 1000));

    console.log("Google response status:", googleResponse.status);
    console.log(
      "Google response content type:",
      googleResponse.headers.get("content-type")
    );
    console.log(
      "Google response body:",
      responseText.slice(0, 2000)
    );

    let result;

    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error(
        "Google Apps Script returned non-JSON content."
      );
    }

    if (!googleResponse.ok || !result.success) {
      throw new Error(
        result.message || "Google Sheets submission failed."
      );
    }

    return res.status(200).json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
    });
  } catch (error) {
    console.error("Lead submission error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to submit your inquiry.",
    });
  }
}