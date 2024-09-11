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
      `<center>
        <b>
          <h1>Hello, everything is good this side </h1>
        </b>
        <br />
        <ul>
          <li>login provider - /api/v1/auth/login </li> <br/>
          <li>register provider - /api/v1/auth/register </li> <br/>
          <li>all items provider - /api/v1/product/ </li> <br/>
          <li>item provider - /api/v1/product/:productId </li> <br/>
          <li>item edit or add provider - /api/v1/product/add/:productId </li> <br/>
          <li>owner details provider & setter to cookies - /api/v1/profile/owner </li> <br/>
          <li>owner's details updation provider - /api/v1/profile/owner/edit </li> <br/>
          
          <li>user details provider & setter to cookies - /api/v1/profile/user </li> <br/>
          <li>user's details updation provider - /api/v1/profile/user/edit/:userId </li> <br/>
        </ul>
      </center>`
    );
  }
);
export default router;
