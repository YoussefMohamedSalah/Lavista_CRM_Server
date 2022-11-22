import express from "express";
import { Village } from "../entities/village";
const router = express.Router();

// Adding New Village Info
router.post("/api/create_village", async (req, res) => {
    const { village_name } = req.body;
    const village = Village.create({
        village_name,
    });

    await village.save();
    return res.json(village);
});

// Get All Villages Info
router.get("/api/get_villages", async (req, res) => {
    const village = await Village.find();
    return res.json(village);
});

export { router as createVillageRouter };
