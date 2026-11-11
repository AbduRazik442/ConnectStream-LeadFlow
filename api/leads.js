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

    // Get n8n Production Webhook URL
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      throw new Error("n8n webhook URL is not configured.");
    }

    // Convert React field names to n8n field names
    const leadData = {
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: companyName.trim(),
      industry: industry.trim(),
      service: service.trim(),
      website:
        typeof website === "string" ? website.trim() : "",
      message:
        typeof message === "string" ? message.trim() : "",
      created_at: new Date().toISOString(),
    };

    // Send lead to n8n
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

    let result;

    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error(
        "n8n returned an unexpected response. Check the Respond to Webhook node."
      );
    }

    if (!n8nResponse.ok || result.success !== true) {
      throw new Error(
        result.message || "Unable to save lead through n8n."
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