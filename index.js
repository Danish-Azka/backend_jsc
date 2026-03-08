import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./models/index.js";

import { pengurusRoute } from "./routes/pengurusRoute.js";
import { adminRoute } from "./routes/adminRoute.js";
import { prestasiRoute } from "./routes/prestasiRoute.js";
import { carouselRoute } from "./routes/carouselRoute.js";
import { blogRoute } from "./routes/blogRoute.js";
import { galleryRoute } from "./routes/galleryRoute.js";

const app = express();
const PORT = 3008;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(cookieParser());

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(pengurusRoute);
app.use(adminRoute);
app.use(prestasiRoute);
app.use(carouselRoute);
app.use(blogRoute);
app.use(galleryRoute)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});