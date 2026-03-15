import express from "express"
import multer from "multer";
import { createBlog, deleteBlog, getBlog, updateBlog} from "../controller/blogController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const blogRoute = express.Router();


const upload = multer({ dest: "uploads/" });

blogRoute.post("/blog/post",upload.single("img"),createBlog);
blogRoute.get("/blog/get", verifyToken,getBlog)
blogRoute.put(
  "/blog/update/:id",
  upload.single("img"),
  updateBlog
);
blogRoute.delete("/blog/delete/:id", deleteBlog)

export{blogRoute}