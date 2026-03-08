import Pengurus from "../models/pengurusModels.js";

export const createPengurus = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "File tidak terkirim" });
    }
    const { Divisi, about } = req.body;
    const pengurus = await Pengurus.create({
      Divisi,
      img: req.file.filename,
      about,
    });
    res.status(201).json(pengurus);
  } catch (error) {
    console.error("ERROR BACKEND:", error);
    res.status(500).json({ error: error.message });
  }
};



export const getPengurus = async (req, res) => {
  try {
    const pengurus = await Pengurus.findAll();
    res.status(200).json(pengurus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPengurusById = async (req, res) => {
  try {
    const { id } = req.params;

    const pengurus = await Pengurus.findByPk(id);
    if (!pengurus) {
      return res.status(404).json({ message: "ga ada" });
    }

    res.status(200).json(pengurus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePengurus = async (req, res) => {
  const id = Number(req.params.id);

  const body = Array.isArray(req.body) ? req.body[0] : req.body;

  const dataUpdate = {};
  if (body.Divisi) dataUpdate.Divisi = body.Divisi;
  if (body.about) dataUpdate.about = body.about;
  if (req.file) dataUpdate.img = req.file.filename;

  console.log("FINAL UPDATE PAYLOAD:", dataUpdate);

  if (Object.keys(dataUpdate).length === 0) {
    return res.status(400).json({ message: "No data to update" });
  }

  const [updated] = await Pengurus.update(dataUpdate, {
    where: { id }
  });

  res.json({ updated });
};


export const deletePengurus = async (req, res) => {
  try {
    const { id } = req.params;

    const pengurus = await Pengurus.findByPk(id);
    if (!pengurus) {
      return res.status(404).json({ message: "Pengurus tidak ditemukan" });
    }

    await pengurus.destroy();

    res.status(200).json({ message: "Pengurus berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
