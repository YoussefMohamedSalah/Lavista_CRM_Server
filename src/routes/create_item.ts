import express from "express";
import { Item } from "../entities/Item";
const router = express.Router();

router.post("/api/item", async (req, res) => {
    const { title, label, condition, needs, category_Id } = req.body;
    const item = Item.create({
        title,
        label,
        condition,
        needs,
        category: category_Id,
    });

    await item.save();
    return res.json(item);
});

// Get Request
router.get("/api/item", async (req, res) => {
    const item = await Item.find();
    return res.json(item);
});

export { router as createItemRouter };
