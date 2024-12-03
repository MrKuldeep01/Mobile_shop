import envConfig from "../../config/envConfig.js";
import fetchData from "../../utils/FetchData.js";
class Auth {
  async register(formData = {}) {
    try {
      const data = formData;
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
      const url = `${envConfig.serverBaseURI}/auth/register`;
      const userData = await fetchData(url, data);
      console.log("registered userData  :-  ", userData);
      return userData;
      // setting details to local storage or something else;
    } catch (error) {    
      throw new Error(error);
    }
    return null;
  }
  async login(formData = {}) {
    // gmail || mobile, password
    try {
      const url = `${envConfig.serverBaseURI}/auth/login`;
      const loginUserData = await fetchData(url, formData);
      return loginUserData;
      // further processing as per requirement
    } catch (error) {    
      throw new Error(error);
    }
    return null;
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
