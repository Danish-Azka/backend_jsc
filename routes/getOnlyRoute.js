import express from "express"
import multer from "multer";
import { getPrestasi } from "../controller/prestasiController.js"
import { getPengurus } from "../controller/pengurusController.js"
import { getGallery } from "../controller/galleryController.js"
import { getCarousel } from "../controller/carouselController.js"
import { getBlog } from "../controller/blogController.js";
import { getUpComingEvent } from "../controller/upComingEventController.js";
const getOnly = express.Router();


const upload = multer({ dest: "uploads/" });

getOnly.get("/consume/get/blog", getBlog)
getOnly.get("/consume/get/prestasi", getPrestasi)
getOnly.get("/consume/get/pengurus", getPengurus)
getOnly.get("/consume/get/gallery", getGallery)
getOnly.get("/consume/get/carousel", getCarousel)
getOnly.get("/consume/get/event", getUpComingEvent)


export{getOnly}