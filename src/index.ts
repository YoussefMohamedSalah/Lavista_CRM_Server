import { createConnection } from "typeorm";
import express from "express";
import Cors from "cors";
import dotenv from "dotenv";
// entities
import { Village } from "./entities/village";
import { Section } from "./entities/Section";
import { Category } from "./entities/Category";
import { Item } from "./entities/Item";
import { User } from "./entities/User";
import { Worker } from "./entities/Worker";
import { Owner } from "./entities/Owner";
// routes
import { createVillageRouter } from "./routes/create_village";
import { createSectionRouter } from "./routes/create_section";
import { createCategoryRouter } from "./routes/create_category";
import { createItemRouter } from "./routes/create_item";
import { createOwnerRouter } from "./routes/create_owner";
import { createUserRouter } from "./routes/create_user";
import { createWorkerRouter } from "./routes/create_worker";
// auth
import { authRouter } from "./routes/auth/auth";
import { protectedRouter } from "./routes/protected";

// constants
dotenv.config();
const app = express();

const main = async () => {
    try {
        const connection = await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "YoussefMai##",
            database: "lavistaDB",
            entities: [
                // sections and category
                Section,
                Category,
                Item,
                // ----
                Village,
                // workers and Users
                User,
                Worker,
                Owner,
            ],
            synchronize: true,
        });

        console.log("You'r Now Cronnected To Database");

        app.use(express.json());
        app.use(Cors());
        // ----
        app.use(createSectionRouter);
        app.use(createCategoryRouter);
        app.use(createItemRouter);
        // ----
        app.use(createOwnerRouter);
        app.use(createUserRouter);
        app.use(createWorkerRouter);
        app.use(createVillageRouter);
        app.use("/auth", authRouter);
        app.use(protectedRouter);

        app.listen(8080, () => {
            console.log("Now running on port 8080");
        });
    } catch (error) {
        console.error(error);
        throw new Error("Unable To Connect To Database");
    }
};
main();
