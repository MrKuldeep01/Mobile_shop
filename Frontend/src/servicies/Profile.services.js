import envConfig from "../../Config/envConfig.js";
import fetchData from "../../utils/FetchData.js";
class Profile {
  async getCurrentUser() {
    try {
      const url = `${envConfig.serverBaseURI}/profile/currentUser`;
      const currentUser = await fetchData(url);
      console.log("currentUser is : " + currentUser);

      // further actions as per your requirement
    } catch (error) {
      console.log(
        "Error during getting current user:: profile services.js :: services :- " +
          error
      );
      throw new Error(
        "Error during getting current user:: profile services.js :: services :- " +
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

    } catch (error) {
      console.log(
        "Error during changing password :: profile services.js :: services :- " +
          error
      );
      throw new Error(
        "Error during changing password :: profile services.js :: services :- " +
          error
      );
    }
    return null;
  }
  async editDetails(data={}){
    
  }
}
const profile = new Profile();
export default profile;
