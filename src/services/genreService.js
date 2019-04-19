import axios from "axios";
import auth from "../services/authService";

axios.defaults.headers.common["x-auth-token"] = auth.getJwt();

export const getGenres = () => {
    return axios.get(`http://localhost:3900/api/genres`);
}