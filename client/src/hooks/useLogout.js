import axios from "../api/axios";
import useAuth from "./useAuth";

//TODO remove persist from local storage on logout OR make sure on login trust box checks for local storage object and determines state from that
const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            
            const response = await axios('/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout