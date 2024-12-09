import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { User as userModel } from "../models/User.model.js";
import constants from "../constants.js";
import { Owner as ownerModel } from "../models/Owner.model.js";
import cloudinaryUploader from "../utils/Cloudinary.js";
// import { Address as addressModel } from "../models/Address.model.js";
async function generateTokens(user) {
  console.log("generating tokens...");
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  return { accessToken, refreshToken };
}

//MULTER: SINGLE FILE NAMED IMAGE ///////// ✅
export const register = AsyncHandler(async (req, res) => {
  const { name, gmail, mobile, gender, password, isOwner, address } = req.body;
  const requiredField = { name, gmail, mobile, gender, password };
  for (const [key, val] of Object.entries(requiredField)) {
    if (key?.val?.trim() === "") {
      throw new ApiError(402, `${key} is required field!`);
    }
  }
  const existingUser = await userModel.findOne({
    $or: [{ gmail }, { mobile }],
  });
  if (existingUser) {
    throw new ApiError(409, "this gmail or mobile number is already in use!");
  }
  const imageLocalPath = req?.file?.path;
  let image;

  if (isOwner === true || isOwner == "true") {
    image = imageLocalPath
      ? await cloudinaryUploader(imageLocalPath)
      : "https://raw.githubusercontent.com/MrKuldeep01/Mobile_shop/refs/heads/main/Backend/public/images/owner.png";

    await registerOwner(
      name,
      gmail,
      mobile,
      password,
      gender,
      image,
      address,

    );
    
    return;
  } else {
    image = imageLocalPath
      ? await cloudinaryUploader(imageLocalPath)
      : "https://raw.githubusercontent.com/MrKuldeep01/Mobile_shop/refs/heads/main/Backend/public/images/user.png";
    await registerUser(name, gmail, mobile, gender, password, image, address);
    return;
  }

  async function registerUser(
    name,
    gmail,
    mobile,
    gender,
    password,
    image,
    address
  ) {
    const createdUser = await userModel.create({
      name,
      gmail,
      mobile,
      gender,
      password,
      address,
      image,
    });
    if (!createdUser) {
      throw new ApiError(500, "Error from server while registering!");
    }
    const { accessToken, refreshToken } = await generateTokens(createdUser);
    createdUser.refreshToken = refreshToken;
    await createdUser.save({ validateBeforeSave: false });
    const newUser = await userModel
      .findById(createdUser._id)
      .select("-password -refreshToken");
    if (!newUser) {
      throw new ApiError(500, "Error from server while registering!");
    }
    return res
      .status(201)
      .cookie("accessToken", accessToken, constants.ATOptionsForCookies)
      .cookie("refreshToken", refreshToken, constants.RTOptionsForCookies)
      .json(
        new ApiResponse(
          201,
          `Registeration for ${newUser.name} is completed successfuly.`,
          newUser
        )
      );
  }
  //   |^^^^|-------------------------- user created ----------------------------|^^^^|
  async function registerOwner(
    name,
    gmail,
    mobile,
    password,
    gender,
    image,
    address,
  ) {
    // const isAnyOwner = await ownerModel.find()
    // if(isAnyOwner.length >= 1){
    //   throw new ApiError(406,"Owner already available, please contect with real Owner or Dev. Mr kuldeep.")
    // }
    const createdOwner = await ownerModel.create({
      name,
      gmail,
      mobile,
      gender,
      image,
      address,
      password,
    });

    if (!createdOwner) {
      throw new ApiError(409, "Error in owner's regesteration!");
    }

    const { accessToken, refreshToken } = await generateTokens(createdOwner);
    createdOwner.refreshToken = refreshToken;
    await createdOwner.save({ validateBeforeSave: false });
    const newOwner = await ownerModel
      .findById(createdOwner._id)
      .select("-password -refreshToken");
    if (!newOwner) {
      throw new ApiError(409, "Error in owner's regesteration!");
    }
    return res
      .status(200)
      .cookie("accessToken", accessToken, constants.ATOptionsForCookies)
      .cookie("refreshToken", refreshToken, constants.RTOptionsForCookies)
      .json(
        new ApiResponse(
          201,
          `Owner -: ${newOwner.name} :- is created successfuly.`,
          newOwner
        )
      );
  }
});
// Login✅
export const login = AsyncHandler(async (req, res) => {
  // login steps
  /*
    get data
    validate 
    check password 
    assign cookies
  */

  let { gmail, password, mobile, isOwner } = req.body;
  gmail = gmail ? gmail.trim() : "";
  password = password ? password.trim() : "";
  mobile = mobile ? Number(mobile.trim()) : "";
  isOwner = typeof isOwner === "boolean" ? isOwner : isOwner === "true";
  // isOwner = true/false;

  if (!password && !(gmail || mobile)) {
    throw new ApiError(406, "You have missed required fields!");
    // 406 for unacceptable
  }
  const owner = undefined;
  if (Boolean(isOwner) === true || isOwner == "true") {
    owner = await ownerModel.findOne({
      $or: [{ gmail }, { mobile }],
    });

    if (!owner) {
      throw new ApiError(401, "Not a valid Owner, please register first!");
    }

    const isPasswordOk = await owner.checkPassword(password);
    if (!isPasswordOk) {
      throw new ApiError(401, "Invalid credentials, fill it carefully1");
      // 401 for unauthorized
    }
    const { accessToken, refreshToken } = generateTokens(owner);
    owner.refreshToken = refreshToken;
    await owner.save({ validateBeforeSave: false });
    const authenticatedOwner = await ownerModel
      .findById(owner._id)
      .select("-password -refreshToken");

    return res
      .status(200)
      .cookie("accessToken", accessToken, constants.ATOptionsForCookies)
      .cookie("refreshToken", refreshToken, constants.RTOptionsForCookies)
      .json(
        new ApiResponse(
          201,
          "Owner is successfully logged in :)",
          authenticatedOwner
        )
      );
  } else {
    const user = await userModel.findOne({
      $or: [{ mobile }, { gmail }],
    });
    if (!user) {
      throw new ApiError(401, "you are not valid user, please register first!");
    }
    const isPasswordOk = await user.checkPassword(password);
    console.log("entered password is : ", isPasswordOk);
    if (!isPasswordOk) {
      throw new ApiError(402, "Check the fields and fill with care!");
    }

    const { accessToken, refreshToken } = await generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const authenticatedUser = await userModel
      .findById(user._id)
      .select(" -password -refreshToken ");

    return res
      .status(200)
      .cookie("accessToken", accessToken, constants.ATOptionsForCookies)
      .cookie("refreshToken", refreshToken, constants.RTOptionsForCookies)
      .json(
        new ApiResponse(
          201,
          `User ${authenticatedUser.name} is Loged in now.`,
          authenticatedUser
        )
      );
  }
});

// Protected Logout
/*
  req.user get user credetials 
  check 
  user from database
  remove refresh token
  clear req.cookies- accessToken & refreshToken

*/
export const logout = AsyncHandler(async (req, res) => {
  const userCheck = req.user;
  if (!userCheck) {
    throw new ApiError(400, "Bad request, You are not authorized!");
  }
  const dbUser = await (userCheck.isOwner
    ? ownerModel.findById(userCheck._id)
    : userModel.findById(userCheck._id));
  console.log(dbUser, " is logged out.");
  dbUser.refreshToken = null;
  await dbUser.save({ validateBeforeSave: false });
  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, "You are logged out now."));
});
