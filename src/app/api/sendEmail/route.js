import nodemailer from 'nodemailer';

// Handle POST requests to send email
export async function POST(req) {
  const { noms, email, telephone, subject, message} = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const lesNoms = noms.map(nomObj => `${nomObj.nom} ${nomObj.prenom}`).join(', ');
    await transporter.sendMail({
      from: `${email} `,
      to: process.env.EMAIL_USER,
      subject: `${subject} `,
      text: `${message || ""}\n\n les noms des adultes: ${lesNoms} \n\n email: ${email}\nnom:${noms[0].nom}${noms[0].prenom}\ntelephone: ${telephone}`,
    });

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error sending email', error }), { status: 500 });
  }
}
