import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { User as userModel } from "../models/User.model.js";
import constants from "../constants.js";
import { Owner as ownerModel } from "../models/Owner.model.js";
import cloudinaryUploader from "../utils/Cloudinary.js";

function generateTokens(user) {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  return { accessToken, refreshToken };
}

/*
Register user

read inputs ✅
validate inputs ✅
check for user existence with same credetials ✅
hash the password  :: autometic by the pre save hook of the model ✅
save the user ✅

send the response with the created user by removing the password and tokens from the user object.✅


*/
export const register = AsyncHandler(async (req, res) => {
  const {
    name,
    gmail,
    mobile,
    gender,
    password,
    address,
    rating,
    experience,
    isOwner,
  } = req.body;
  console.log(
    "name ",
    name,
    "gmail ",
    gmail,
    "mobile ",
    mobile,
    "gender ",
    gender,
    "password ",
    password,
    "address ",
    address,
    "rating ",
    rating,
    "experience ",
    experience,
    "isOwner ",
    isOwner
  );

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
    throw new ApiError(409, "this gmail or mobile number is already in use!", [
      existingUser,
    ]);
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
      rating,
      experience
    );
    return;
  } else {
    image = imageLocalPath
      ? await cloudinaryUploader(imageLocalPath)
      : "https://raw.githubusercontent.com/MrKuldeep01/Mobile_shop/refs/heads/main/Backend/public/images/user.png";
    await registerUser(name, gmail, mobile, gender, password, image, address);
    return;
  }

  async function registerUser(name, gmail, mobile, gender, password, image, address) {
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
    const { accessToken, refreshToken } = generateTokens(createdUser);
    createdUser.refreshToken = refreshToken;
    await createdUser.save({ validateBeforeSave: false });
    const newUser = await userModel
      .findById(createdUser._id)
      .select("-password -refreshToken");
    if (!newUser) {
      throw new ApiError(500, "Error from server while registering!");
    }
    return res
      .status(200)
      .cookie("accessToken", accessToken, constants.ATOptionsForCookies)
      .cookie("refreshToken", refreshToken, constants.RTOptionsForCookies)
      .json(
        new ApiResponse(
          201,
          `Registeration for ${newUser.name} is completed successfuly`,
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
    rating = 4,
    experience = 12
  ) {
    const createdOwner = await ownerModel.create({
      name,
      gmail,
      mobile,
      gender,
      image,
      address,
      password,
      rating,
      experience,
    });

    if (!createdOwner) {
      throw new ApiError(409, "Error in owner's regesteration!");
    }

    const { accessToken, refreshToken } = generateTokens(createdOwner);
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

export const login = AsyncHandler(async (req, res) => {
  // login steps
  /*
    get data
    validate 
    check password 
    assign cookies
  */

  const { gmail, password, mobile, isOwner } = req.body;
  // isOwner = true/false;
  console.log(
    "gmail, password, mobile, isOwner :: ",
    gmail,
    password,
    mobile,
    isOwner
  );
  if (!(password && (gmail || mobile))) {
    console.log("bhai required fields to bhro phle!");
    throw new ApiError(405, "You have missed some fields!");
  }
  if (Boolean(isOwner) === true || isOwner == "true") {
    const owner = await ownerModel.findOne({
      $or: [{ gmail }, { mobile }],
    });

    if (!owner) {
      throw new ApiError(409, "Not a valid Owner, please register first!");
    }

    const isPasswordOk = await owner.checkPassword(password);
    if (!isPasswordOk) {
      throw new ApiError(409, "Invalid credentials, fill it carefully1");
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
      $or: [{ gmail }, { mobile }],
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
        new ApiResponse(201, "User logged in Successfully", authenticatedUser)
      );
  }
});

export const getCurrentUser = AsyncHandler(async (req, res) => {
  return res.status(200);
  json(new ApiResponse(200, "User successfully fetched", req.user));
});

export const passwordChange = AsyncHandler(async (req, res) => {
  /*
  if edit route is accessible then this is logged in user
  Hence user - req.user via middleware 
  --- fields must not't be changed
  email, mobile, name

  ====
  - get data to update 
  - validat the comming data
  - update data 
  - all good
  */
});
