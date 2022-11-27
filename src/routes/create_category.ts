import express from "express";
import { Category } from "../entities/Category";
import { createQueryBuilder } from "typeorm";
import { Item } from "../entities/Item";
import { checkAuth } from "../../middleware/checkAuth";

const router = express.Router();

// Post Request
router.post("/api/category", async (req, res) => {
    const { title, shortcut, section } = req.body;
    const category = Category.create({
        title,
        shortcut,
        section,
    });

    await category.save();
    return res.json(category);
});

// Get All Ctegories with items
router.get("/api/category/items", checkAuth, async (req, res) => {
    const category = await createQueryBuilder("category")
        .select("category")
        .from(Category, "category")
        .leftJoinAndSelect("category.items", "items")
        .getMany();

    return res.json(category);
});

// Get single category with items
router.get("/api/:category_title/items", checkAuth, async (req, res) => {
    const { category_title } = req.params;

    const category = await createQueryBuilder("category")
        .select("category")
        .from(Category, "category")
        .where("category.title = :category_title", { category_title })
        .leftJoinAndSelect("category.items", "items")
        .getMany();

    return res.json(category);
});

export { router as createCategoryRouter };
