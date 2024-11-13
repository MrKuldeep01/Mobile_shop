import { Router } from "express";
const router = Router();
import {upload} from "../middlewares/multer.middleware.js"
// to ways of writing routers
// router.get("/",(req,res,next)=>{
//     console.log("this is from middelware!");
//     next();
// },(_,res)=>{
//   res.send("hello sir this is working...");
// })
const data = {
  message : 
  "happy day"
}
//second 
router.route("/").post(upload.single("image"),(req, res) => {
  const { desc,check } = req.body;
  const image = req?.file;
    res.send({message: "okay", desc, image, check})

  // res.send(
  //   `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; height: 90vh; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; ">

  //         <a href="https://github.com/mrkuldeep01/Mobile_shop.git">
  //         <h1 style="font-size: 44px; font-weight: bold; color: #333; text-align: center;">
  //         Congretulation!🎊👨‍💻🚀 
  //         </h1>
          
  //         <p style="font-size: 16px; line-height: 1.5; color: #555; margin-top: 20px;">
  //            Every thing is looking great, Now please read documantion to gain the knowledge about routing.🔗😎 for this project.
  //         </p>
  //         </a> 
  //     </body>
  //     `
  // );

}); 

export default router;
