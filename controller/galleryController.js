import Gallery from "../models/galleryModel.js";
import fs from "fs";
import path from "path";

export const createGallery = async (req, res) => {
  try {

    console.log("body:", req.body);
    console.log("file:", req.file);

    const { judul, date } = req.body;

    const img = req.file ? req.file.filename : null;

    if (!judul || !date || !img) {
      return res.status(400).json({
        message: "Semua field wajib diisi"
      });
    }

    const gallery = await Gallery.create({
      judul,
      date,
      img
    });

    res.status(201).json({
      message: "Gallery berhasil dibuat",
      data: gallery
    });

  } catch (error) {

    console.log("Create gallery error:", error);

    res.status(500).json({
      message: error.message
    });

  }
};

export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findAll();
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGallery = async (req, res) => {
  const id = Number(req.params.id);

  const body = Array.isArray(req.body) ? req.body[0] : req.body;

  const dataUpdate = {};
  if (body.judul) dataUpdate.judul = body.judul;
  if (body.date) dataUpdate.date = body.date;
  if (req.file) dataUpdate.img = req.file.filename;

  console.log("FINAL UPDATE PAYLOAD:", dataUpdate);

  if (Object.keys(dataUpdate).length === 0) {
    return res.status(400).json({ message: "No data to update" });
  }

  const [updated] = await Gallery.update(dataUpdate, {
    where: { id }
  });

  res.json({ updated });
};


export const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findByPk(id);
    if (!gallery) {
      return res.status(404).json({ message: "gallery tidak ditemukan" });
    }

 if (gallery.img) {
      const filePath = path.join("uploads", gallery.img);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await gallery.destroy();

    res.status(200).json({ message: "gallery berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
