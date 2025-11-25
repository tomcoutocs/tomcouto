import { Resend } from "resend";
import { NextResponse } from "next/server";

// Only initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!resend) {
      // Log the form submission for now (you can view this in server logs)
      console.log("Contact form submission (Resend not configured):", {
        name,
        email,
        subject,
        message,
      });
      
      return NextResponse.json(
        { 
          error: "Email service is not configured. Please contact me directly at tomcouto.cs@gmail.com",
          message: "Form submission logged. Email service will be available soon."
        },
        { status: 503 }
      );
    }

    // Send email using Resend
    // Note: For testing, you can use onboarding@resend.dev
    // To use your own domain, verify it in Resend dashboard and update the "from" address
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["tomcouto.cs@gmail.com"],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

