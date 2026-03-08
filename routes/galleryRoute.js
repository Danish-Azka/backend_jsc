import express from "express"
import multer from "multer";
import { createGallery, deleteGallery, getGallery, updateGallery} from "../controller/galleryController.js";
const galleryRoute = express.Router();


const upload = multer({ dest: "uploads/" });

galleryRoute.post("/gallery/post",upload.single("img"),createGallery);
galleryRoute.get("/gallery/get", getGallery)
galleryRoute.put(
  "/gallery/update/:id",
  upload.single("img"),
  updateGallery
);
galleryRoute.delete("/gallery/delete/:id", deleteGallery)

export{galleryRoute}