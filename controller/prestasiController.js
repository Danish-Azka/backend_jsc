import Prestasi from "../models/prestasiModel.js";

export const createPrestasi = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "File tidak terkirim" });
    }
    const { judul, tanggal, lokasi, detail } = req.body;
    const prestasi = await Prestasi.create({
      judul,
      tanggal,
      lokasi,
      detail,
      img: req.file.filename,
    });
    res.status(201).json(prestasi);
  } catch (error) {
    console.error("ERROR BACKEND:", error);
    res.status(500).json({ error: error.message });
  }
};



export const getPrestasi = async (req, res) => {
  try {
    const prestasi = await Prestasi.findAll();
    res.status(200).json(prestasi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPrestasiById = async (req, res) => {
  try {
    const { id } = req.params;

    const prestasi = await Prestasi.findByPk(id);
    if (!prestasi) {
      return res.status(404).json({ message: "ga ada" });
    }

    res.status(200).json(prestasi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePrestasi = async (req, res) => {
  const id = Number(req.params.id);

  const body = Array.isArray(req.body) ? req.body[0] : req.body;

  const dataUpdate = {};
  if (body.judul) dataUpdate.judul = body.judul;
  if (body.tanggal) dataUpdate.tanggal = body.tanggal;
  if (body.lokasi) dataUpdate.lokasi = body.lokasi;
  if (body.detail) dataUpdate.detail = body.detail;
  if (req.file) dataUpdate.img = req.file.filename;

  console.log("FINAL UPDATE PAYLOAD:", dataUpdate);

  if (Object.keys(dataUpdate).length === 0) {
    return res.status(400).json({ message: "No data to update" });
  }

  const [updated] = await Prestasi.update(dataUpdate, {
    where: { id }
  });

  res.json({ updated });
};


export const deletePrestasi = async (req, res) => {
  try {
    const { id } = req.params;

    const prestasi = await Prestasi.findByPk(id);
    if (!prestasi) {
      return res.status(404).json({ message: "Pengurus tidak ditemukan" });
    }

    await prestasi.destroy();

    res.status(200).json({ message: "Pengurus berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
