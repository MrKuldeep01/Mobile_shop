import envConfig from "../../config/envConfig.js";
import fetchData from "../../utils/FetchData.js";
class Auth {
  async register(formData) {
    try {
      /* it would look like : 
            {
        name,
        gmail,
        mobile,
        gender,
        password,
        isOwner,
        image
        }
            */
      if (!formData) {
        throw new Error("please provide data for registeration!");
      }
      const url = `${envConfig.serverBaseURI}/auth/register`;
      const userData = await fetchData(url, formData);
      console.log("registered userData  :-  ", userData);
      return userData;
      // setting details to local storage or something else;
    } catch (error) {
      throw new Error(error);
    }
  }
  async login(formData) {
    // gmail || mobile, password
    try {
      if (!formData) {
        throw new Error("please provide data for Login!");
      }
      const url = `${envConfig.serverBaseURI}/auth/login`;
      const loginUserData = await fetchData(url, formData);
      return loginUserData;
      // further processing as per requirement
    } catch (error) {
      throw new Error(error);
    }
  }
  async logout() {
    try {
      const url = `${envConfig.serverBaseURI}/auth/logout`;
      const status = await fetchData(url);
      console.log("your logout status is : " + status.message);
      return status;
      // future working will be here ...
    } catch (error) {
      throw new Error(error);
    }
    return null;
  }
}

const auth = new Auth();

export default auth;
