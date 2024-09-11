import { Router } from "express";
const router = Router();

router.get("/",(req,res)=>{
  res.send("hello sir this is working...");
})

export default router;