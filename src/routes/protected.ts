// import express from "express";
// import { Category } from "../entities/Category";
// import { createQueryBuilder } from "typeorm";
// import { checkAuth } from "../../middleware/checkAuth";

// const router = express.Router();

// // Post Request
// router.post("/api/category", async (req, res) => {
//     const { title, shortcut, section_Id } = req.body;
//     const category = Category.create({
//         title,
//         shortcut,
//         section: section_Id,
//     });

//     await category.save();
//     return res.json(category);
// });

// // Get Request
// router.get("/api/category_public", async (req, res) => {
//     const category = await createQueryBuilder("category")
//         .select("category")
//         .from(Category, "category")
//         .leftJoinAndSelect("category.items", "items")
//         .getMany();

//     return res.json(category);
// });

// // // we will protect this route
// // router.get(
// //     "/api/category_private",
// //     async (req, res, next) => {
// //         const userValid = false;

// //         if (userValid) {
// //             const category = await createQueryBuilder("category")
// //                 .select("category")
// //                 .from(Category, "category")
// //                 .leftJoinAndSelect("category.items", "items")
// //                 .getMany();
// //             next();
// //             return res.json(category);
// //         } else {
// //             return res.status(400).json({
// //                 errors: [
// //                     {
// //                         msg: "Access Denied",
// //                     },
// //                 ],
// //             });
// //         }
// //     },
// //     async (req, res) => {
// //         const category = await createQueryBuilder("category")
// //             .select("category")
// //             .from(Category, "category")
// //             .leftJoinAndSelect("category.items", "items")
// //             .getMany();

// //         return res.json(category);
// //     }
// // );

// // we will protect this route
// router.get("/api/category_private", checkAuth, async (req, res) => {
//     const category = await createQueryBuilder("category")
//         .select("category")
//         .from(Category, "category")
//         .leftJoinAndSelect("category.items", "items")
//         .getMany();

//     return res.json(category);
// });
// export { router as protectedRouter };
