import express from "express";
import { Section } from "../entities/Section";
const router = express.Router();

router.post("/api/section", async (req, res) => {
    const { title, village_id } = req.body;
    const sectionTable = Section.create({
        title,
    });

    await sectionTable.save();
    return res.json(sectionTable);
});

export { router as createSectionRouter };
