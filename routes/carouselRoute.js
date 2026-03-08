import express from "express"
import multer from "multer";
import { createCarousel, deleteCarousel, getCarousel, updateCarousel} from "../controller/carouselController.js";
const carouselRoute = express.Router();


const upload = multer({ dest: "uploads/" });

carouselRoute.post("/carousel/post",upload.single("img"),createCarousel);
carouselRoute.get("/carousel/get", getCarousel)

carouselRoute.put(
  "/carousel/update/:id",
  upload.single("img"),
  updateCarousel
);
carouselRoute.delete("/carousel/delete/:id", deleteCarousel)

export{carouselRoute}