import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controllers/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", protectRoute, requireAdmin, getFeaturedSongs);
router.get("/made-for-you", protectRoute, requireAdmin, getMadeForYouSongs);
router.get("/trending", protectRoute, requireAdmin, getTrendingSongs);

export default router;