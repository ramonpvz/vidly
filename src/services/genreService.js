import axios from "axios";

export const getGenres = () => {
    return axios.get(`http://localhost:3900/api/genres`);
}