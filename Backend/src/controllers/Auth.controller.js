import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { User as userModel } from "../models/User.model.js";
import constants from "../constants.js";
import { Owner as ownerModel } from "../models/Owner.model.js";
import cloudinaryUploader from "../utils/Cloudinary.js";
import { Address as addressModel} from "../models/Address.model.js";
async function generateTokens(user) {
  console.log("generating tokens...");
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  return { accessToken, refreshToken };
} 
 
//MULTER: SINGLE FILE NAMED IMAGE /////////
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
 
  console.log( "name ", name, "gmail ", gmail, "mobile ", mobile, "gender ", gender, "password ", password, "address ", address, "rating ", rating, "experience ", experience, "isOwner ", isOwner);

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
    console.log("Tokens : ",accessToken,"\t",refreshToken) /////------------------->
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
    rating,
    experience
  ) {
    // const isAnyOwner = await ownerModel.find()
    // if(isAnyOwner.length >= 1){
    //   throw new ApiError(406,"Owner already available, please contect with real Owner or Dev. Mr kuldeep.")
    // }
    rating = rating ? parseInt(rating) : 1
    experience = experience ? parseInt(experience) : 1
    console.log(rating, typeof(rating),"\n",experience, typeof(experience));
    const createdOwner = await ownerModel.create({
      name,
      gmail,
      mobile,
      gender,
      image,
      address,
      password,
      rating,
      experience
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
    throw new ApiError(406, "You have missed some fields!");
    // 406 for unacceptable 
  }
  if (Boolean(isOwner) === true || isOwner == "true") {
    const owner = await ownerModel.findOne({
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

// getCurrentUser PROTECTED /////////
export const getCurrentUser = AsyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(401).redirect("/auth/login");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "User successfully fetched", user));
});

//  password change  PROTECTED /////////
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

  // get previous Password, gmail/mobile, newPassword;
  // check for correction
  // overwrite the password value with newPassword
  // return success message

  const { gmail, mobile, prePassword, newPassword } = req.body;
  if ((!gmail && !mobile) || !prePassword || !newPassword) {
    throw new ApiError(406, "Please provide required values properly.");
  }
  const currentUser = req.user;
  if (currentUser.gmail !== gmail || currentUser.mobile !== mobile) {
    throw new ApiError(
      400,
      "Bad request, You are not allowed to change password of other's a/c."
    );
  }
  const user = currentUser.isOwner
    ? await ownerModel.findById(currentUser._id)
    : await userModel.findById(currentUser._id);
  if (!user) {
    throw new ApiError(500, "Faild while changing the password.");
    // 500 for internal server error
  }
  const isPasswordOk = user.checkPassword(prePassword);
  if (!isPasswordOk) {
    throw new ApiError(401, "Invalid credentials");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, "Password is changed successfully.", {}));
});

//  editUser  PROTECTED /////////
//MULTER: SINGLE FILE NAMED IMAGE /////////
/*
  userId 
  ownerId
  localAddress
  city
  postCode
  state
*/
export const editUser = AsyncHandler(async (req, res) => {
  // gmail, mobile, image
  let {
    newGmail,
    newMobile,
    localAddress,
    city,
    postCode,
    state,
    experience,
  } = req.body;

  const user = req.user.isOwner
    ? await ownerModel.findById(req.user._id)
    : await userModel.findById(req.user._id);

  if (!user) {
    throw new ApiError(401, "Unautorized request!");
  }

  // Validate address if the user doesn't have one yet
  if (!user.addressId) {
    const addressFields = { localAddress, city, postCode, state };
    for (let [field, value] of Object.entries(addressFields)) {
      if (value.trim() === "") {
        throw new ApiError(400, `You must provide a valid ${field}.`);
      }
    }

    // Create a new address entry
    const address = await addressModel.create({
      [`${user.isOwner ? "ownerId" : "userId"}`]: user._id,
      localAddress,
      city,
      postCode,
      state,
    });
    user.addressId = address._id;
    await user.save({ validateBeforeSave: false });
  }

  // Update new values only if provided
  newGmail = req.body?.newGmail || user.gmail;
  let newImage = req.file?.path
    ? await cloudinaryUploader(req.file.path)
    : user.image;
  newMobile = req.body?.newMobile || user.mobile;

  if (user.experience) {
    experience = req.body.experience || user.experience;
  }

  // Update user details
  const userUpdate = await (user.isOwner
    ? ownerModel.findByIdAndUpdate(
        req.user._id,
        { gmail: newGmail, mobile: newMobile, image: newImage, experience },
        { new: true }
      )
    : userModel.findByIdAndUpdate(
        req.user._id,
        { gmail: newGmail, mobile: newMobile, image: newImage },
        { new: true }
      )
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(200, `${user.name} successfully updated.`, userUpdate)
    );
});

// Protected Logout
/*
  req.user get user credetials 
  check 
  user from database
  remove refresh token
  clear req.cookies- accessToken & refreshToken

*/
export const logout = AsyncHandler(async(req, res)=>{
const userCheck = req.user;
if(!userCheck){
  throw new ApiError(400, "Bad request, You are not authorized!")
}
const dbUser = await (
  userCheck.isOwner ? ownerModel.findById(userCheck._id) 
  : userModel.findById(userCheck._id)
)
console.log(dbUser)
dbUser.refreshToken = null
await dbUser.save({validateBeforeSave: false})
return res.status(200)
.clearCookie("accessToken")
.clearCookie("refreshToken")
.json(new ApiResponse(200,"You are logged out now."))
})


