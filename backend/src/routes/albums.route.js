import { Router } from "express";
import { getAlbumById, getAlbums } from "../controllers/album.controller";

const router = Router();

router.get("/", getAlbums);
router.get("/:albumId", getAlbumById);

export default router;