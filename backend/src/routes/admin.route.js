import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Admin route wiht get method");
})

export default router;