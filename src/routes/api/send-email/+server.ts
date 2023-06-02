import type { RequestHandler } from '@sveltejs/kit';
import nodemailer from 'nodemailer';


export const POST: RequestHandler = async ({request}) => {

  const body = await request.json();
  const { name, company, email, message } = body;
  console.log(import.meta.env)

  // Configure your email credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: import.meta.env.VITE_GMAIL_USER,
      pass: import.meta.env.VITE_GMAIL_PASSWORD,
    },
  });

  // Configure email options
  const mailOptions = {
    from: import.meta.env.VITE_GMAIL_USER, // This should be the Gmail account used for sending emails
    to: import.meta.env.VITE_RECEIVER_EMAIL,
    replyTo: email, // This is the email address entered in the form
    subject: `Contact message from ${name} at ${company ?? 'N/A'}`,
    text: message,
  };
  

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    return new Response(JSON.stringify({ success: false, message: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};