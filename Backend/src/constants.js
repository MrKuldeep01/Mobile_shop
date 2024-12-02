const dataBaseName = "MobileShop";
const accessTokenExpiry = 24 * 60 * 60; 
const refreshTokenExpiry = 24 * 60 * 60 * 10;
const bcryptRound = 12;
const ATOptionsForCookies = {
  maxAge: accessTokenExpiry * 1000,
  httpOnly: true,
  // secure: true, // in production
  secure: false, // testing in http env
  // sameSite: "strict", // in production : restrict to navigate through same site
  sameSite: "lax" 
};
const RTOptionsForCookies = {
  maxAge: refreshTokenExpiry * 1000, 
  httpOnly: true,
  // secure: true,  // in production
  secure: false, // testing in http env
  // sameSite: "strict", // in production : restrict to navigate through same site
  sameSite: "lax" 
};
const baseUrl = "/api/v1"; 
export default {
  dataBaseName,
  bcryptRound,
  RTOptionsForCookies,
  ATOptionsForCookies,
  baseUrl,
};
