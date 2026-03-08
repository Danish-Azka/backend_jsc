import express from "express"
import multer from "multer";
import { createPrestasi, getPrestasi, getPrestasiById, updatePrestasi, deletePrestasi} from "../controller/prestasiController.js";
const prestasiRoute = express.Router();

const upload = multer({ dest: "uploads/" });

prestasiRoute.post("/prestasi/post",upload.single("img"),createPrestasi);
prestasiRoute.get("/prestasi/get", getPrestasi)
prestasiRoute.get("/prestasi/get/:id", getPrestasiById)
prestasiRoute.put(
  "/prestasi/update/:id",
  upload.single("img"),
  updatePrestasi
);
prestasiRoute.delete("/prestasi/delete/:id", deletePrestasi)

export{prestasiRoute}