import express from 'express';
import { getAllAlbums, createAlbum } from '../Controller/AlbumController.js';

const routers = express.Router();

routers.get('/getAlbum', getAllAlbums);
routers.post('/addAlbum', createAlbum);

export default routers;
