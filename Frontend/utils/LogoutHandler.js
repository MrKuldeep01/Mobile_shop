import authServices from "../src/servicies/Auth.services.js";

const handleLogout = async () => {
  try {
    const res = await authServices.logout();
    if (res.success) {      
      return res;
    }
    throw new Error(res.message || 'Logout failed');
  } catch (error) {
    throw error;
  }
};

export default handleLogout;