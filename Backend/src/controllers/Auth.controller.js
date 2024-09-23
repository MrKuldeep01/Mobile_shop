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
    entityrole,
  } = req.body;

  if (
    [name, gmail, mobile, gender, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(402, ` ${field} is required!`);
  }
  const existingUser = await userModel.find({
    $or: [{ gmail }, { mobile }],
  });
  if (existingUser) {
    throw new ApiError(409, "this gmail or mobile number is already in use!");
  }

  async function registerUser(
    name,
    gmail,
    mobile,
    gender,
    password,
    address = ""
  ) {
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
    gender,
    address,
    password,
    rating = 4,
    experience = 12
  ) {
    const createdOwner = await ownerModel.create(
      name,
      gmail,
      mobile,
      gender,
      address,
      password,
      rating,
      experience
    );

    if (!createdOwner) {
      throw new ApiError(409, "Error in owner's regesteration!");
    }

    const { accessToken, refreshToken } = generateTokens(createdOwner);
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
      .json(new ApiResponse(201, `Owner ${newOwner.name} is created successfuly.`, newOwner));
  }
  if (entityrole && entityrole === "owner") {
    registerOwner(name, gmail, mobile, gender, address, rating,
        experience);
  } else {
    registerUser(name, gmail, mobile, gender, address);
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

});
