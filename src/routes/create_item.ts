import express from "express";
import { Item } from "../entities/Item";
import { createQueryBuilder } from "typeorm";
import { checkAuth } from "../../middleware/checkAuth";
const router = express.Router();

router.post("/api/item", async (req, res) => {
    const { title, label, condition, category_Id } = req.body;
    const item = Item.create({
        title,
        label,
        condition,
        category: category_Id,
    });

    await item.save();
    return res.json(item);
});

// Get All Items
router.get("/api/item", async (req, res) => {
    const item = await Item.find();
    return res.json(item);
});

// Get All Items With Qr Code List
router.get("/api/all_items/qrcode_list", checkAuth, async (req, res) => {
    const item = await createQueryBuilder("item")
        .select("item")
        .from(Item, "item")
        .leftJoinAndSelect("item.qrCodeList", "qrCodeList")
        .getMany();

    return res.json(item);
});

export { router as createItemRouter };
