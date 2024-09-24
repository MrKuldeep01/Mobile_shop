import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { User as userModel } from "../models/User.model.js";
import constants from "../constants.js";
import { Owner as ownerModel } from "../models/Owner.model.js";

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
  if (
    [name, gmail, mobile, gender, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(402, ` ${field} is required!`);
  }
  const existingUser = await userModel.findOne({
    $or: [{ gmail }, { mobile }],
  });
  if (existingUser) {
    throw new ApiError(409, "this gmail or mobile number is already in use!", [
      existingUser,
    ]);
  }

  async function registerUser(name, gmail, mobile, gender, password, address) {
    const createdUser = await userModel.create({
      name,
      gmail,
      mobile,
      gender,
      password,
      address,
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
      .cookie("accessToken", accessToken, constants.optionsForCookies)
      .cookie("refreshToken", refreshToken, constants.optionsForCookies)
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
    address,
    rating = 4,
    experience = 12
  ) {
    const createdOwner = await ownerModel.create({
      name,
      gmail,
      mobile,
      gender,
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
      .cookie("accessToken", accessToken, constants.optionsForCookies)
      .cookie("refreshToken", refreshToken, constants.optionsForCookies)
      .json(
        new ApiResponse(
          201,
          `Owner -: ${newOwner.name} :- is created successfuly.`,
          newOwner
        )
      );
  }

  if (isOwner) {
    registerOwner(
      name,
      gmail,
      mobile,
      password,
      gender,
      address,
      rating,
      experience
    );
  } else {
    registerUser(name, gmail, mobile, gender, password, address);
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

  if ([gmail, password, mobile].some((val) => val?.trim() === "")) {
    throw new ApiError(409, `${val} is required field`);
  }

  if (isOwner === undefined || isOwner === false) {
    const user = await userModel.findOne({
      $or: [{ gmail }, { mobile }],
    });
    if (!user) {
      throw new ApiError(401, "you are not valid user, please register first!");
    }
    const isPasswordOk = await user.methods.checkPassword(password);
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
      .cookie("accessToken", accessToken, optionsForCookies)
      .cookie("refreshToken", refreshToken, optionsForCookies)
      .json(
        new ApiResponse(201, "User logged in Successfully", authenticatedUser)
      );
  }

  const owner = await ownerModel.findOne({
    $or: [{ gmail }, { mobile }],
  });

  if (!owner) {
    throw new ApiError(409, "Not a valid Owner, please register first!");
  }
  const isPasswordOk = await owner.methods.checkPassword(password);
  if (!isPasswordOk) {
    throw new ApiError(409, "Invalid credentials, fill it carefully1");
  }
  const { accessToken, refreshToken } = generateTokens(owner);
  owner.refreshToken = refreshToken;
  await owner.save({ validateBeforeSave: false });
  const authenticatedOwner = await ownerModel
    .findById(owner._id)
    .select("-password -refreshToke");

  return res
    .status(200)
    .cookie("accessToken", accessToken, optionsForCookies)
    .cookie("refreshToken", refreshToken, optionsForCookies)
    .json(
      new ApiResponse(
        201,
        "Owner is successfully logged in :)",
        authenticatedOwner
      )
    );
});
