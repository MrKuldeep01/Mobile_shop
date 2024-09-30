const dataBaseUri = String(process.env.DB_URI);
const allowed_Origin = String(process.env.ALLOWED_ORIGIN);
const refreshTokenSecretKey = String(process.env.REFRESHTOKENSECRETKEY);
const refreshTokenExpiry = String(process.env.REFRESHTOKENEXPIRY);
const accessTokenSecretKey = String(process.env.ACCESSTOKENSECRETKEY);
const accessTokenExpiry = String(process.env.ACCESSTOKENEXPIRY);
const cloudinaryApiKey = String(process.env.CLOUDINARYKEY);
const cloudinaryApiSecret = String(process.env.CLOUDINARYSECRET);
const cloudinaryName = String(process.env.CLOUDINARYNAME);
const cloudinaryUrl = String(process.env.CLOUDINARYURL);
export default {
    dataBaseUri,
    allowed_Origin,
    refreshTokenSecretKey,
    refreshTokenExpiry,
    cloudinaryApiKey,
    accessTokenSecretKey,
    cloudinaryApiSecret,
    accessTokenExpiry,     
    cloudinaryName,
    cloudinaryUrl,
};
