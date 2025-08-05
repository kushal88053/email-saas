"use server";
import nodemailer from "nodemailer";

interface Props {
  userEmail: string[];
  subject: string;
  content: string;
}

const adminMail = process.env.ADMIN_EMAIL as string;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ userEmail, subject, content }: Props) => {
  try {
    const response = await transporter.sendMail({
      from: adminMail,
      to: userEmail,
      subject,
      html: content,
    });

    return response;
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};
