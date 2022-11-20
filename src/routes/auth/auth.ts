import express from "express";
import { check, validationResult } from "express-validator";
import { User } from "../../entities/User";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const router = express.Router();

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

        const { first_name, last_name, loggin, password, manager_of } =
            req.body;

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
                "876asdn3oks@d,9ked(76rdndiousdlws%4fdp'wxsy",
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
            });
            await userData.save();
            // sent JWT token to clinet side
            return res.json({ Authorization: token });
        }
    }
);

router.post("/login", async (req, res) => {
    const { loggin, password } = req.body;

    const userLoggin = await User.createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.loggin = :loggin", { loggin: loggin })
        .getOne();

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
                "876asdn3oks@d,9ked(76rdndiousdlws%4fdp'wxsy",
                {
                    // three hours
                    expiresIn: 43200,
                }
            );
            return res.json({ Authorization: token });
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
