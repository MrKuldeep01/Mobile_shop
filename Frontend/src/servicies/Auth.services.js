import envConfig from "../../Config/envConfig.js";
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
      console.log(
        "Error during registeration  :: authServices.js :: services :- " + error
      );
      throw new Error(
        "Error during registeration  :: authServices.js :: services :- " + error
      );
    }
    return null;
  }
  async login(formData = {}) {
    try {
      const url = `${envConfig.serverBaseURI}/auth/login`;
      const loginUserData = await fetchData(url, formData, "POST");
      console.log("logged in data is : ", loginUserData);
      return loginUserData;
      // further processing as per requirement
    } catch (error) {
      console.log(
        "Error during login :: authServices.js :: services :- " + error
      );
      throw new Error(
        "Error during login :: authServices.js :: services :- " + error
      );
    }
    return null;
  }
  async logout() {
    try {
      const url = `${envConfig.serverBaseURI}/auth/logout`;
      const status = await fetchData(url);
      console.log("your logout status is : " + status);
      return status;    
      // future working will be here ...
      
    } catch (error) {
      console.log(
        "Error during logout :: authServices.js :: services :- " + error
      );
      throw new Error(
        "Error during logout :: authServices.js :: services :- " + error
      );
    }
    return null;
  }
}

const auth = new Auth();

export default auth;
