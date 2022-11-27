import express from "express";
import { BrokenItem } from "../entities/qr_code/broken_items_options";
import { createQueryBuilder } from "typeorm";
import { Item } from "../entities/Item";
import { checkAuth } from "../../middleware/checkAuth";

const router = express.Router();

// Post Request
router.post("/api/broken_item", checkAuth, async (req, res) => {
    const { title, label, item_id } = req.body;
    const brokenItem = await BrokenItem.create({
        title,
        label,
        item_id: item_id,
    });

    await brokenItem.save();
    return res.json(brokenItem);
});

// Get Request
router.get("/api/broken_item", checkAuth, async (req, res) => {
    const brokenItem = await createQueryBuilder("broken_items")
        .select("broken_items")
        .from(BrokenItem, "broken_items")
        .leftJoinAndSelect("broken_items.item_id", "item_id")
        .getMany();

    return res.json(brokenItem);
});

export { router as createBrokenItemRouter };
