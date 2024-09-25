import envConfig from "../Config/envConfig.js"; // Assuming you're using this config somewhere later

const dataBaseName = "MobileShop";

// Access token expiry in seconds (1 day = 24 * 60 * 60 seconds)
const accessTokenExpiry = 24 * 60 * 60; // 1 day
const refreshTokenExpiry = 24 * 60 * 60 * 10; // 10 days

// bcrypt salt rounds (number of hashing iterations)
const bcryptRound = 12;

// Cookie options for access token
const ATOptionsForCookies = {
  maxAge: accessTokenExpiry * 1000, // Convert seconds to milliseconds
  httpOnly: true, // Not accessible via JavaScript
  secure: true, // Only sent over HTTPS
  sameSite: 'strict', // Prevent CSRF
};

// Cookie options for refresh token
const RTOptionsForCookies = {
  maxAge: refreshTokenExpiry * 1000, // Convert seconds to milliseconds
  httpOnly: true, // Not accessible via JavaScript
  secure: true, // Only sent over HTTPS
  sameSite: 'strict', // Prevent CSRF
};

const baseUrl = "/api/v1"; // Base URL for API routes

// Export the configuration object
export default {
  dataBaseName,
  bcryptRound,
  RTOptionsForCookies,
  ATOptionsForCookies,
  baseUrl,
};
