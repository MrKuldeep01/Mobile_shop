import { v2 as cloudinary } from "cloudinary";
import envConfig from "../../Config/envConfig.js";
import fs from "fs";
// Configuration
cloudinary.config({
  cloud_name: envConfig.cloudinaryName,
  api_key: envConfig.cloudinaryApiKey,
  api_secret: envConfig.cloudinaryApiSecret,
});

async function cloudinaryUploader(fileLink) {
  try {
    // Upload an image
    if (!fileLink) {
      return null;
    }
    const uploadedFile = await cloudinary.uploader.upload(fileLink, {
      resource_type: "auto",
    });
    if (uploadedFile) {
      fs.unlinkSync(fileLink);
      console.log("file uploaded on cloudinary ", uploadedFile);
      return uploadedFile.url;
    }
  } catch (error) {
    fs.unlinkSync(fileLink);
    console.log(
      "error occured during uploading file with cloudinary ",
      fileLink
    );
    return null;
  }
}
export default cloudinaryUploader;
