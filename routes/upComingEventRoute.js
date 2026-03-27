import express from "express"
import multer from "multer";
import { createUpComingEvent, getUpComingEvent, deleteUpComingEvent, updateUpComingEvent } from "../controller/upComingEventController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const upComingEventRoute = express.Router();


const upload = multer({ dest: "uploads/" });

upComingEventRoute.post("/event/post",upload.single("img"),createUpComingEvent);
upComingEventRoute.get("/event/get", verifyToken,getUpComingEvent)
upComingEventRoute.put(
  "/event/update/:id",
  upload.single("img"),
  updateUpComingEvent
);
upComingEventRoute.delete("/event/delete/:id", deleteUpComingEvent)

export{upComingEventRoute}