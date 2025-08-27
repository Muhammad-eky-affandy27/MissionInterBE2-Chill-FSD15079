// Controller untuk autentikasi (register, login, verifikasi email)
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const db = require("../config/database");
const { sendVerificationEmail } = require("../utils/emailService");

// Register pengguna baru
const register = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    // Validasi input
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({
        error: "Semua field harus diisi.",
      });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await db("users")
      .where({ email })
      .orWhere({ username })
      .first();

    if (existingUser) {
      return res.status(400).json({
        error: "Email atau username sudah terdaftar.",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate token verifikasi
    const verificationToken = uuidv4();

    // Simpan user ke database
    const [userId] = await db("users").insert({
      fullname,
      username,
      email,
      password: hashedPassword,
      verification_token: verificationToken,
    });

    // Kirim email verifikasi
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: "Registrasi berhasil. Silakan cek email untuk verifikasi.",
    });
  } catch (error) {
    console.error("Error register:", error);
    res.status(500).json({
      error: "Terjadi kesalahan server.",
    });
  }
};

// Login pengguna
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({
        error: "Email dan password harus diisi.",
      });
    }

    // Cari user berdasarkan email
    const user = await db("users").where({ email }).first();

    if (!user) {
      return res.status(400).json({
        error: "Email atau password salah.",
      });
    }

    // Verifikasi password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        error: "Email atau password salah.",
      });
    }

    // Cek apakah email sudah diverifikasi
    if (!user.is_verified) {
      return res.status(400).json({
        error: "Email belum diverifikasi. Silakan cek email Anda.",
      });
    }

    // Buat token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login berhasil.",
      token,
    });
  } catch (error) {
    console.error("Error login:", error);
    res.status(500).json({
      error: "Terjadi kesalahan server.",
    });
  }
};

// Verifikasi email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        error: "Token verifikasi diperlukan.",
      });
    }

    // Cari user dengan token verifikasi
    const user = await db("users").where({ verification_token: token }).first();

    if (!user) {
      return res.status(400).json({
        error: "Token verifikasi tidak valid.",
      });
    }

    // Update status verifikasi user
    await db("users").where({ id: user.id }).update({
      is_verified: true,
      verification_token: null,
    });

    res.json({
      message: "Email berhasil diverifikasi. Silakan login.",
    });
  } catch (error) {
    console.error("Error verify email:", error);
    res.status(500).json({
      error: "Terjadi kesalahan server.",
    });
  }
};

module.exports = { register, login, verifyEmail };
