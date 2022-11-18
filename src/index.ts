import { createConnection } from "typeorm";
import express from "express";
// entities
import { Section } from "./entities/Section";
import { Category } from "./entities/Category";
import { Item } from "./entities/Item";
// routes
import { createSectionRouter } from "./routes/create_section";
import { createCategoryRouter } from "./routes/create_category";
import { createItemRouter } from "./routes/create_item";

// constants
const port = process.env.PORT;
const database = process.env.DATABASE;

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
            entities: [Section, Category, Item],
            synchronize: true,
        });

        console.log("You'r Now Cronnected To Database");

        app.use(express.json());
        app.use(createSectionRouter);
        app.use(createCategoryRouter);
        app.use(createItemRouter);

        app.listen(8080, () => {
            console.log("Now running on port 8080");
        });
    } catch (error) {
        console.error(error);
        throw new Error("Unable To Connect To Database");
    }
};
main();
