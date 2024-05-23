
import axios from "axios";
import { logout } from "../components/appSlice";


export const Logout = async (dispatch, user) => {
    try {

        await axios.post(`https://api.freeapi.app/#/%F0%9F%94%90%20Authentication/logoutUser/`, {
            refresh_token: getRefresh()
        }, );

        localStorage.clear();

        dispatch(logout());
    } catch (error) {
        throw error;
    }
}

