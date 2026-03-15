import express from "express"
import multer from "multer";
import { createPengurus, deletePengurus, getPengurus, updatePengurus,  getPengurusById} from "../controller/pengurusController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const pengurusRoute = express.Router();


const upload = multer({ dest: "uploads/" });

pengurusRoute.post("/pengurus/post",upload.single("img"),createPengurus);
pengurusRoute.get("/pengurus/get",verifyToken, getPengurus)

pengurusRoute.put(
  "/pengurus/update/:id",
  upload.single("img"),
  updatePengurus
);
pengurusRoute.delete("/pengurus/delete/:id", deletePengurus)

export{pengurusRoute}