import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log("Prev Auth: " + JSON.stringify(prev));
            if(!response){
                return {
                    ...prev
                }
            }else{
            return {
                    currUser: response.data.currUser,
                    accessToken: response.data.accessToken
                }
            }
        });
        console.log("New Auth: " + JSON.stringify(auth));
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
