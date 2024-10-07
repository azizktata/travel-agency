import nodemailer from 'nodemailer';

// Handle POST requests to send email
export async function POST(req) {
  const { nom, email, phone, subject, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `${subject} ${nom}`,
      text: `${message}\n\nPhone: ${phone}`,
    });

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error sending email', error }), { status: 500 });
  }
}
