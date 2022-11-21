import { appendFile } from "fs";
import multer from "multer";
import express from "express";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/upload_image", upload.single("imagename"), (req, res) => {
    // const image = req.file,
    // // incode the buffer to string
    // // const image = req.file.buffer.toString('base64')
    // name: req.body.name,
    // price : req.body.price
    // don't forget to change incode type in front end
    // enctype="multipart/form-data"  ----   name="uploaded_file"
});


// const multer  = require('multer')
// const upload = multer({ dest: './public/data/uploads/' })
// app.post('/stats', upload.single('uploaded_file'), function (req, res) {
//    // req.file is the name of your file in the form above, here 'uploaded_file'
//    // req.body will hold the text fields, if there were any 
//    console.log(req.file, req.body)
// });