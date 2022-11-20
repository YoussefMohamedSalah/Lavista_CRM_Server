import express from "express";
import { Owner } from "../entities/Owner";
const router = express.Router();

router.post("/api/create_owner", async (req, res) => {
    const { first_name, last_name, owner_of, Maintenance_fees, car_plate } =
        req.body;
    const owner = Owner.create({
        first_name,
        last_name,
        owner_of,
        Maintenance_fees,
        car_plate,
    });

    await owner.save();
    return res.json(owner);
});

// Get Request
router.get("/api/get_owners", async (req, res) => {
    const owner = await Owner.find();
    return res.json(owner);
});

export { router as createOwnerRouter };
