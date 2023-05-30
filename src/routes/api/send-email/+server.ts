import type { RequestHandler } from '@sveltejs/kit';
import nodemailer from 'nodemailer';


export const POST: RequestHandler = async ({request}) => {

  // Configure OAuth2 credentials
  const clientId = import.meta.env.VITE_CLIENT_ID; // Your client ID
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET; // Your client secret
  const refreshToken = import.meta.env.VITE_REFRESH_TOKEN; // Your refresh token
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN; // Your access token

  const body = await request.json();
  const { name, company, email, message } = body;
  console.log(import.meta.env)

  // Configure your email credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: import.meta.env.VITE_GMAIL_USER,
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
      accessToken: accessToken
    }
  });

  // Configure email options
  const mailOptions = {
    from: import.meta.env.VITE_GMAIL_USER, // This should be the Gmail account used for sending emails
    to: import.meta.env.VITE_RECEIVER_EMAIL,
    replyTo: email, // This is the email address entered in the form
    subject: `Contact message from ${name}`,
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