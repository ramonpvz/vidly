import axios from "axios";
import auth from "../services/authService";

const urlApi = 'http://localhost:3900/api/movies';

axios.defaults.headers.common["x-auth-token"] = auth.getJwt();

export const getMovies = () => {
    return axios.get(urlApi);
}

export const getMovie = (movieId) => {
    return axios.get(urlApi + '/' + movieId);
}

function movieUrl(id) {
    return `${urlApi}/${id}`
}

export const saveMovie = (movie) => {
    if (movie._id) {
        const body = { ...movie };
        delete body._id
        return axios({
            method: 'put',
            url: movieUrl(movie._id),
            data: body
        }).catch(err => {
            throw err;
        });
    }   
    return axios({
        method: 'post',
        url: urlApi,
        data: movie
    }).catch(err => {
        throw err;
    });
}

export const updateMovie = (movie) => {
    return axios({
        method: 'put',
        url: movieUrl(movie._id),
        data: movie
    }).catch(err => {
        throw err;
    });
}

export const deleteMovie = (id) => {
    return axios({
        method: 'delete',
        url: movieUrl(id)
    }).catch(err => {
        throw err;
    });
}   

/*function setJwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
    setJwt
}*/