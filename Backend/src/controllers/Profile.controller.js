import AsyncHandler from "../utils/AsyncHandler.js";
import { User as userModel } from "../models/User.model.js";
import { Owner as ownerModel } from "../models/Owner.model.js";

//_______________________ Profile ______________________//

// getCurrentUser PROTECTED ///////// ✅
export const getCurrentUser = AsyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(401).redirect("/auth/login");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "User successfully fetched", user));
});

//  password change  PROTECTED /////////✅
/*
  ====
  - get data to update :  gmail, mobile, prePassword, newPassword 
  - validat the comming data
  - update data 
  - all good
  */
export const passwordChange = AsyncHandler(async (req, res) => {

  // get previous Password, gmail/mobile, newPassword;
  // check for correction
  // overwrite the password value with newPassword
  // return success message

  const { gmail, mobile, prePassword, newPassword } = req.body;
  if ((!gmail && !mobile) || !prePassword || !newPassword) {
    throw new ApiError(406, "Please provide required values properly.");
  }
  const currentUser = req.user;
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
  console.log("password is changed for ", user.name);
  return res
    .status(200)
    .json(new ApiResponse(200, "Password is changed successfully.", {}));
});

//  editUser  PROTECTED /////////
//MULTER: SINGLE FILE NAMED IMAGE /////////
/*
 newGmail, newMobile, localAddress, city, postCode, state, experience 
*/
export const editUser = AsyncHandler(async (req, res) => {
  // newGmail, newMobile, localAddress, city, postCode, state, experience 
  let { newGmail, newMobile, localAddress, city, postCode, state, experience } =
    req.body;

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
