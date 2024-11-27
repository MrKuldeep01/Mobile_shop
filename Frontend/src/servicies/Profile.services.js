import envConfig from "../../config/envConfig.js"
import fetchData from "../../utils/FetchData.js";
class Profile {
  async getCurrentUser() {
    try {
      const url = `${envConfig.serverBaseURI}/profile/currentUser`;
      const currentUser = await fetchData(url);
      console.log("currentUser is : " + currentUser);
      return currentUser;
      // further actions as per your requirement
    } catch (error) {     
      throw new Error(
        error
      );
    }
    return null;
  }
  
  async passwordChange(data = {}) {
    try {
      // { gmail, mobile, prePassword, newPassword }
      const url = `${envConfig.serverBaseURI}/profile/password-change`;
      const responseData = await fetchData(url, data);
      console.log("password change status : "+responseData);
      // here we can work further
      return responseData;

    } catch (error) {
      throw new Error(
        "Error during changing password :: profile services.js :: services :- " +
          error
      );
    }
    return null;
  }

  async editDetails(data={}){
    // it would be look like : {newGmail, newMobile, localAddress, city, postCode, state, experience }
    try {
      const url = `${envConfig.serverBaseURI}/profile/edit-details`;
      const responseData = await fetchData(url, data);
      console.log("edited details status : "+responseData);
      return responseData;

    } catch (error) {
      throw new Error(
        "Error during editing details :: profile services.js :: services :- " +
          error
      );
    }
    return null;
  }
}
const profile = new Profile();
export default profile;
