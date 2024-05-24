import { logout } from "../components/appSlice";

const getToken = () => {
    return localStorage.getItem("access_token");
};

export const Logout = async (dispatch, user) => {
    const token = getToken();

    console.log(user, token, "details");

    setTimeout(() => {
        localStorage.clear();
        dispatch(logout());
        console.log("Logged out successfully after timeout");
    }, 2000); 
};
