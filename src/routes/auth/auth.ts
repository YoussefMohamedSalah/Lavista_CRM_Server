import express from "express";
import dotenv from "dotenv";
import { check, validationResult } from "express-validator";
import { User } from "../../entities/User";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// constants
const router = express.Router();
dotenv.config();
const secretHash = process.env.SECRET_HASH;

router.post(
    "/signup",
    check(
        "password",
        "please provide a 7 characters or more password"
    ).isLength({ min: 7, max: 20 }),
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            first_name,
            last_name,
            loggin,
            password,
            manager_of,
            user_type,
        } = req.body;

        const userLoggin = await User.createQueryBuilder()
            .select("user")
            .from(User, "user")
            .where("user.loggin = :loggin", { loggin: loggin })
            .getOne();

        if (userLoggin) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "this user already exist",
                    },
                ],
            });
        } else {
            // hassing our password
            const hashedPassword = await bcrypt.hash(password, 10);
            // create JWT
            const token = await JWT.sign(
                {
                    loggin,
                },
                `${secretHash}`,
                {
                    // three hours
                    expiresIn: 43200,
                }
            );
            res.header(token);
            // adding data to database
            const userData = User.create({
                first_name,
                last_name,
                loggin,
                password: hashedPassword,
                manager_of,
                user_type,
            });
            await userData.save();
            // sent JWT token to clinet side
            return res.json({
                access: token,
                id: userData.id,
                first_name: userData.first_name,
                last_name: userData.last_name,
            });
        }
    }
);

// access token to be saved in locl storage ,,,, three Hours
router.post("/login", async (req, res) => {
    const { loggin, password } = req.body;

    const userLoggin = await User.createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.loggin = :loggin", { loggin: loggin })
        .getOne();

    // const userType = await User.createQueryBuilder()
    // .select("user")
    // .from(User, "user")
    // .where("user.user_type = :user_type", { user_type: user_type })
    // .getOne();

    if (userLoggin) {
        const isMatch = await bcrypt.compare(password, userLoggin.password);

        if (!isMatch) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Invalid Credentials",
                    },
                ],
            });
        } else {
            const token = await JWT.sign(
                {
                    loggin,
                },
                `${secretHash}`,
                {
                    // three hours
                    expiresIn: 43200,
                }
            );
            res.header(token);
            return res.json({
                access: token,
                id: userLoggin.id,
                first_name: userLoggin.first_name,
                last_name: userLoggin.last_name,
                user_type: userLoggin.user_type,
                manager_of: userLoggin.manager_of,
            });
        }
    } else {
        return res.status(400).json({
            errors: [
                {
                    msg: "Invalid Credentials",
                },
            ],
        });
    }
});

export { router as authRouter };
