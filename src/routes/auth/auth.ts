import express from "express";
import { check, validationResult } from "express-validator";
import { User } from "../../entities/User";
const router = express.Router();

router.post(
    "/user",
    check(
        "password",
        "please provide a 7 characters or more password"
    ).isLength({ min: 7, max: 20 }),
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { first_name, last_name, loggin, password, manager_of } =
            req.body;

        const userLoggin = await User.createQueryBuilder()
            .select("user")
            .from(User, "user")
            .where("user.loggin = :loggin", { loggin: loggin })
            .getOne();
            
        if (userLoggin) {
            res.status(400).json({
                errors: [
                    {
                        msg: "this user already exist",
                    },
                ],
            });
        } else {
            const userData = User.create({
                first_name,
                last_name,
                loggin,
                password,
                manager_of,
            });
            await userData.save();
            return res.json(userData);
        }
        return res.send("user added");
    }
);

export { router as authRouter };
