import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import AdminRoutes from "./Routes/AdminRoutes.js";
import AlbumRoutes from "./Routes/AlbumRoutes.js";
import UserRoutes from "./Routes/UserRoutes.js";

import config from "./config.js";
const mongoURI = config.mongoURI;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static('uploads'));
app.use("/admin", AdminRoutes);
app.use("/createAlbum", AlbumRoutes);
app.use("/user", UserRoutes);

mongoose
  .connect(mongoURI)
  .then(() => app.listen(5500))
  .then(() => console.log("connected to db at port 5500 :)"))
  .catch((err) => console.log(`${err} is error`));
