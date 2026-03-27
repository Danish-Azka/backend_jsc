import Carousel from "../models/carouselModel.js";
import fs from "fs";
import path from "path";

export const createCarousel = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "File tidak terkirim" });
    }
    const { type } = req.body;
    const carousel = await Carousel.create({
      type,
      img: req.file.filename,
    });
    res.status(201).json(carousel);
  } catch (error) {
    console.error("ERROR BACKEND:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getCarousel = async (req, res) => {
  try {
    const carousel = await Carousel.findAll();
    res.status(200).json(carousel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCarousel = async (req, res) => {
  const id = Number(req.params.id);

  const body = Array.isArray(req.body) ? req.body[0] : req.body;

  const dataUpdate = {};
  if (body.type) dataUpdate.type = body.type;
  if (req.file) dataUpdate.img = req.file.filename;

  console.log("FINAL UPDATE PAYLOAD:", dataUpdate);

  if (Object.keys(dataUpdate).length === 0) {
    return res.status(400).json({ message: "No data to update" });
  }

  const [updated] = await Carousel.update(dataUpdate, {
    where: { id }
  });

  res.json({ updated });
};


export const deleteCarousel = async (req, res) => {
  try {
    const { id } = req.params;

    const carousel = await Carousel.findByPk(id);
    if (!carousel) {
      return res.status(404).json({ message: "carousel tidak ditemukan" });
    }


 if (carousel.img) {
      const filePath = path.join("uploads", carousel.img);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await carousel.destroy();

    res.status(200).json({ message: "carousel berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
