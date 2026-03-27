import Blog from "../models/blogModel.js";
import fs from "fs";
import path from "path";

export const createBlog = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "File tidak terkirim" });
    }
    const { judul, paper, date } = req.body;
    const blog = await Blog.create({
      judul,
      img: req.file.filename,
      paper,
      date,
    });
    res.status(201).json(blog);
  } catch (error) {
    console.error("ERROR BACKEND:", error);
    res.status(500).json({ error: error.message });
  }
};



export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findAll();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  const id = Number(req.params.id);

  const body = Array.isArray(req.body) ? req.body[0] : req.body;

  const dataUpdate = {};
  if (body.judul) dataUpdate.judul = body.judul;
  if (body.paper) dataUpdate.paper = body.paper;
  if (body.date) dataUpdate.date = body.date;
  if (req.file) dataUpdate.img = req.file.filename;

  console.log("FINAL UPDATE PAYLOAD:", dataUpdate);

  if (Object.keys(dataUpdate).length === 0) {
    return res.status(400).json({ message: "No data to update" });
  }

  const [updated] = await Blog.update(dataUpdate, {
    where: { id }
  });

  res.json({ updated });
};


export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: "blog tidak ditemukan" });
    }

 if (blog.img) {
      const filePath = path.join("uploads", blog.img);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await blog.destroy();

    res.status(200).json({ message: "blog berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
