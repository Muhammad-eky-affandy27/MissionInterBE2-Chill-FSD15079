// Controller untuk mengelola upload gambar
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Tidak ada file yang diunggah.",
      });
    }

    // Dapatkan informasi file
    const fileInfo = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path,
    };

    res.json({
      message: "File berhasil diunggah.",
      file: fileInfo,
    });
  } catch (error) {
    console.error("Error upload image:", error);
    res.status(500).json({
      error: "Terjadi kesalahan server.",
    });
  }
};

module.exports = { uploadImage };
