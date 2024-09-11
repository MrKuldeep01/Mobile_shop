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
router.route('/').get((req,_,next)=>{
    console.log("this is from middelware!");
    next();
},(_,res)=>{
  res.send("hello sir this is working...");
})
export default router;