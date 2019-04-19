import axios from "axios";
import auth from "../services/authService";

axios.defaults.headers.common["x-auth-token"] = auth.getJwt();

const apiUrl = 'http://localhost:3900/api/users';

export function register(user) {
    return axios({
        method: 'post',
        url: apiUrl,
        data: user
    }).catch(err => {
        throw err;
    });
}
