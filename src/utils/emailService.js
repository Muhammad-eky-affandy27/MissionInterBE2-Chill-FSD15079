// Service untuk mengirim email verifikasi
const nodemailer = require("nodemailer");

// Buat transporter (gunakan service email seperti Gmail)
const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Fungsi untuk mengirim email verifikasi
const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verifikasi Email Anda - Chill Movie",
    html: `
      <h2>Selamat datang di Chill Movie!</h2>
      <p>Silakan klik link berikut untuk verifikasi email Anda:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>Link ini akan kadaluarsa dalam 24 jam.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email verifikasi berhasil dikirim");
  } catch (error) {
    console.error("Gagal mengirim email verifikasi:", error);
    throw new Error("Gagal mengirim email verifikasi");
  }
};

module.exports = { sendVerificationEmail };
