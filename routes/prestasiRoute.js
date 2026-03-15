import express from "express"
import multer from "multer";
import { createPrestasi, getPrestasi, getPrestasiById, updatePrestasi, deletePrestasi} from "../controller/prestasiController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const prestasiRoute = express.Router();

const upload = multer({ dest: "uploads/" });

prestasiRoute.post("/prestasi/post",upload.single("img"),createPrestasi);
prestasiRoute.get("/prestasi/get", verifyToken,getPrestasi)
prestasiRoute.put(
  "/prestasi/update/:id",
  upload.single("img"),
  updatePrestasi
);
prestasiRoute.delete("/prestasi/delete/:id", deletePrestasi)

export{prestasiRoute}