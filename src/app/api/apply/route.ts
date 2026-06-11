import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const jobId = formData.get("jobId") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const resume = formData.get("resume") as File;

    if (!jobId || !fullName || !email || !phone || !resume) {
      return NextResponse.json(
        { error: "Please fill all required fields and upload a resume." },
        { status: 400 }
      );
    }

    // Convert resume File to Buffer
    const arrayBuffer = await resume.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Setup Nodemailer transporter
    // Requires EMAIL_USER and EMAIL_PASS environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "info@maasewahealthcare.com", // Recipient email
      subject: `New Job Application: ${jobTitle} - ${fullName}`,
      text: `
You have received a new job application!

--- Application Details ---
Job Title: ${jobTitle}
Applicant Name: ${fullName}
Email: ${email}
Phone: ${phone}

--- Cover Letter ---
${coverLetter || "No cover letter provided."}

The applicant's resume is attached to this email.
      `,
      attachments: [
        {
          filename: resume.name,
          content: buffer,
        },
      ],
    };

    // Attempt to send email. If env vars are missing, we will catch it.
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn("EMAIL_USER or EMAIL_PASS is not set in environment variables. Email was not sent.");
      // In production, you might want to return an error. But for dev without env vars:
      // return NextResponse.json({ error: "Email configuration is missing on the server." }, { status: 500 });
    }

    // You could also save the application to MongoDB here if you wanted an 'Applications' collection.
    // For now, it only sends the email as requested.

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Apply API Error:", error);
    return NextResponse.json({ error: "Failed to submit application. Please try again later." }, { status: 500 });
  }
}
