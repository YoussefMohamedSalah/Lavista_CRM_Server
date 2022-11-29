import express from "express";
import { checkAuth } from "../../../middleware/checkAuth";
import multer from "multer";
import { User } from "../../entities/User";
// ----------------------------

const router = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "/Images");
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, file.fieldname + "-" + uniqueSuffix);
//     },
// });

// const upload = multer({ storage: storage });

// router.get("/", (req, res) => {
//     res.status(200).send("Hello world");
// });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "/Images");
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, file.fieldname + "-" + uniqueSuffix);
//     },
// });

// const upload = multer({ storage: storage });

const upload = multer({
    dest: "../../../Images",
    preservePath: true,
});

router.post(
    "/api/uploadImage/:user_Id",
    upload.single("image"),
    async (req, res) => {
        const { user_Id } = req.params;

        const user = await User.findOneBy({
            id: req.params.user_Id,
        });

        if (!user) {
            return res.json({
                msg: "user not found",
            });
        } else {
            console.log(user.first_name);
        }
        try {
            console.log(req.body);
            console.log(req.file);
            return res.status(201).json({
                message: "File uploaded successfully",
            });
        } catch (error) {
            console.error(error);
        }

        return console.log("done");

        // const image = req.file?.buffer.toString("base64");
        // const name = req.body.fileName;

        // // if(image){
        // //     user.profile_image = image
        // // }

        // return res.status(201).json({
        //     message: "File uploaded successfully",
        //     imageUrl: image,
        // });
    }
);

// const uploadThumbnailArray = [
//     {
//         name: "thumbnail",
//         maxCount: 3,
//     },
// ];

//Upload route
// router.post(
//     "/upload",
//     upload.single("image"),
//     (req, res, next) => {
//         try {
//             console.log(req.body);
//             console.log(req.files);
//             return res.status(201).json({
//                 message: "File uploaded successfully",
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     }
// );

// Post Request
// router.post("/api/uploadUserImage", upload, async (req, res) => {
//     // const { title, shortcut, section } = req.body;
//     // const category = Category.create({
//     //     title,
//     //     shortcut,
//     //     section,
//     // });
//     // await category.save();
//     // return res.json(category);
// });

export { router as createImageUploadRouter };
