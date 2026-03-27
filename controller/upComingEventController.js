import UpComingEvent from "../models/upComingEvent.js";
import fs from "fs";
import path from "path";

export const createUpComingEvent = async (req, res) => {
  try {

    console.log("body:", req.body);
    console.log("file:", req.file);

    const {url} = req.body;

    const img = req.file ? req.file.filename : null;

    if (!url || !img) {
      return res.status(400).json({
        message: "Semua field wajib diisi"
      });
    }

    const upcomingevent = await UpComingEvent.create({
      url,
      img
    });

    res.status(201).json({
      message: "upComingEvent berhasil dibuat",
      data: upcomingevent
    });

  } catch (error) {

    console.log("Create upComingEvent error:", error);

    res.status(500).json({
      message: error.message
    });

  }
};

export const getUpComingEvent = async (req, res) => {
  try {
    const upcomingevent = await UpComingEvent.findAll();
    res.status(200).json(upcomingevent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUpComingEvent = async (req, res) => {
  const id = Number(req.params.id);

  const body = Array.isArray(req.body) ? req.body[0] : req.body;

  const dataUpdate = {};
  if (body.url) dataUpdate.url = body.url;
  if (req.file) dataUpdate.img = req.file.filename;

  console.log("FINAL UPDATE PAYLOAD:", dataUpdate);

  if (Object.keys(dataUpdate).length === 0) {
    return res.status(400).json({ message: "No data to update" });
  }

  const [updated] = await UpComingEvent.update(dataUpdate, {
    where: { id }
  });

  res.json({ updated });
};


export const deleteUpComingEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const upcomingevent = await UpComingEvent.findByPk(id);
    if (!upcomingevent) {
      return res.status(404).json({ message: "upcomingevent tidak ditemukan" });
    }

    if (upcomingevent.img) {
      const filePath = path.join("uploads", upcomingevent.img);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await upcomingevent.destroy();

    res.status(200).json({ message: "upcomingevent berhasil dihapus" });
  } catch (error) {
    console.log("DELETE ERROR:", error); // 👈 tambahin ini biar keliatan
    res.status(500).json({ error: error.message });
  }
};
