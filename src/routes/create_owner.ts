import express from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Owner } from "../entities/Owner";
const router = express.Router();

// Create New Owner
router.post("/api/create_owner", checkAuth, async (req, res) => {
    const {
        first_name,
        last_name,
        owner_of,
        maintenance_fees,
        car_plate,
        phone_number,
    } = req.body;

    const owner = Owner.create({
        first_name,
        last_name,
        owner_of,
        maintenance_fees,
        car_plate,
        status: "",
        phone_number,
    });

    if (maintenance_fees <= 1000) {
        owner.status = "good";
    } else if (maintenance_fees > 1000 && maintenance_fees < 5000) {
        owner.status = "normal";
    } else if (maintenance_fees >= 5000) {
        owner.status = "urgent";
    }

    await owner.save();
    return res.json(owner);
});

// Get All Owners Data
router.get("/api/get_owners", checkAuth, async (req, res) => {
    const owner = await Owner.find();
    return res.json(owner);
});

// Get One Owner Data
router.get("/api/get_owner/:owner_Id", checkAuth, async (req, res) => {
    const { owner_Id } = req.params;

    const owner = await Owner.findOneBy({
        id: req.params.owner_Id,
    });
    return res.json(owner);
});

export { router as createOwnerRouter };
