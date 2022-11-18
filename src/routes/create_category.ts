import express from "express";
import { Category } from "../entities/Category";
import { createQueryBuilder } from "typeorm";

const router = express.Router();

// Post Request
router.post("/api/category", async (req, res) => {
    const { title, shortcut, section_Id } = req.body;
    const category = Category.create({
        title,
        shortcut,
        section: section_Id,
    });

    await category.save();
    return res.json(category);
});

// Get Request
router.get("/api/category", async (req, res) => {
    const category = await createQueryBuilder("category")
        .select("category")
        .from(Category, "category")
        .leftJoinAndSelect("category.items", "items")
        .getMany();

    return res.json(category);
});

export { router as createCategoryRouter };
