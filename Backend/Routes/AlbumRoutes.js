import express from 'express';
import { getAllAlbums, createAlbum, addPhotoToAlbum } from '../Controller/AlbumController.js';
import {upload} from "../Middleware/multerMiddleware.js";

const routers = express.Router();

routers.get('/getAlbum', getAllAlbums);
routers.post('/addAlbum', createAlbum);
routers.post('/addPhoto/:albumId', upload.single('photo'), addPhotoToAlbum);

export default routers;
