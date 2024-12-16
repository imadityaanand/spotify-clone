import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin } from "../controllers/admin.controller.js";

const router = Router();
router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);
router.post("/songs", createSong);
router.post("/albums", createAlbum);
router.delete("/songs/:id", deleteSong);
router.delete("/album/:id", deleteAlbum);

export default router;