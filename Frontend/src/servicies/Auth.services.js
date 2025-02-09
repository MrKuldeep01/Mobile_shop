import envConfig from "../../config/envConfig.js";
import fetchData from "../../utils/FetchData.js";
function checkCookie() {
  let nameValue = null; // Store the value here
  document.cookie.forEach((item) => {
    const separatorIndex = item.indexOf("=");

    if (separatorIndex !== -1) {
      const name = item.substring(0, separatorIndex).trim();

      if (name === "accessToken") {
        nameValue = item.substring(separatorIndex + 1).trim();
      }
    } else {
      localStorage.setItem("handShake", null);
    }
  });

  if (nameValue !== null) {
    localStorage.setItem("handShake", nameValue);
    console.log("hand Shake cookie setted.")
  } else {
    console.log("Hand Shake cookie not found.");
  }
}
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
      checkCookie();
      console.log("registered.");
      return userData;
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
      checkCookie();
      return loginUserData;
    } catch (error) {
      throw new Error(error);
    }
  }
  async logout() {
    try {
      const url = `${envConfig.serverBaseURI}/auth/logout`;
      const status = await fetchData(url);
      console.log(status?.message);
      localStorage.removeItem("handShake");
      return status;
    } catch (error) {
      throw new Error(error);
    }
    return null;
  }
}

const auth = new Auth();

export default auth;
