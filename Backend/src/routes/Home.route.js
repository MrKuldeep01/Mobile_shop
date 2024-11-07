import { Router } from "express";
const router = Router();

// to ways of writing routers
// router.get("/",(req,res,next)=>{
//     console.log("this is from middelware!");
//     next();
// },(_,res)=>{
//   res.send("hello sir this is working...");
// })

//second
router.route("/").get((_, res) => {
  res.send(
          `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 200px; height: 80vh; width: 100vw; ">

          <h1 style="font-size: 44px; font-weight: bold; color: #333; text-align: center; margin: 20px">
          <a href="https://github.com/mrkuldeep01/Mobile_shop.git">
          Congretulation!🎊👨‍💻🚀 </a> 
          </h1>

          <p style="font-size: 16px; line-height: 1.5; color: #555;">
             Every thing is looking great, Now please read documantion to gain the knowledge about routing.🔗😎 for this project.
          </p>
      </body>
      `
  );
});
export default router;
