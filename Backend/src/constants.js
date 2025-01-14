const dataBaseName = "MobileShop";
const accessTokenExpiry = 24 * 60 * 60 * 7; 
const refreshTokenExpiry = 24 * 60 * 60 * 10;
const bcryptRound = 12;
const ATOptionsForCookies = {
  maxAge: accessTokenExpiry * 1000,
  httpOnly: true,
  secure: true, 
  sameSite: "none"
};
const RTOptionsForCookies = {
  maxAge: refreshTokenExpiry * 1000, 
  httpOnly: true,
   secure: true,  
  sameSite: "none"  
};
const baseUrl = "/api/v1"; 
export default {
  dataBaseName,
  bcryptRound,
  RTOptionsForCookies,
  ATOptionsForCookies,
  baseUrl,
};
