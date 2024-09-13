const dataBaseUri = String(process.env.DB_URI);
const allowed_Origin = String(process.env.ALLOWED_ORIGIN);
const refreshTokenSecretKey = String(process.env.REFRESHTOKENSECRETKEY);
const refreshTokenExpiry = String(process.env.REFRESHTOKENEXPIRY);
const accessTokenSecretKey = String(process.env.ACCESSTOKENSECRETKEY);
const accessTokenExpiry = String(process.env.ACCESSTOKENEXPIRY);

export default {
    dataBaseUri,
    allowed_Origin,
    refreshTokenSecretKey,
    refreshTokenExpiry,
    accessTokenSecretKey,
    accessTokenExpiry,     
};
