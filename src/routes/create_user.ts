import express from "express";
import { User } from "../entities/User";
const router = express.Router();

router.post("/api/create_user", async (req, res) => {
    const { first_name, last_name, user_type, privilege_type, manager_of } =
        req.body;
    const user = User.create({
        first_name,
        last_name,
        user_type,
        privilege_type,
        manager_of,
    });

    await user.save();
    return res.json(user);
});

// Get Request
router.get("/api/get_users", async (req, res) => {
    const user = await User.find();
    return res.json(user);
});

export { router as createUserRouter };
