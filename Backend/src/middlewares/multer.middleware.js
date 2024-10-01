import multer from "multer";
import path from "path";
// import fs from 'fs';
import { fileURLToPath } from "url";
// Get __dirname equivalent in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "/tmp/uploadedFiles")
    const uploadDir = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "tmp",
      "uploadedFiles"
    );
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.round(Math.random() * 1000 + 100);
    const ext = file.originalname.slice(file.originalname.lastIndexOf('.'));
    console.log("extention name is : ",ext);
    cb(null, file.fieldname + "_" + uniqueSuffix + ext);
  },
});

export const upload = multer({ storage });
