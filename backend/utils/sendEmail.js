const nodemailer = require('nodemailer');

const transporter = process.env.EMAIL_USER && process.env.EMAIL_PASS
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  : null;

const sendEmail = async (to, subject, htmlContent) => {
  if (!transporter) {
    console.log('Email not configured, skipping send:', { to, subject });
    return { messageId: 'mock-' + Date.now() };
  }

  try {
    const info = await transporter.sendMail({
      from: `"MediCare AI" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent
    });
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;