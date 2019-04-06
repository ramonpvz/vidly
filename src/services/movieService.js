import axios from "axios";

const urlApi = 'http://localhost:3900/api/movies';

export const getMovies = () => {
    return axios.get(urlApi);
}

export const saveMovie = (movie) => {
    axios({
        method: 'post',
        url: urlApi,
        data: movie
    })
}

export const deleteMovie = (id) => {
    axios({
        method: 'delete',
        url: urlApi + "/" + id
    }).catch(err => {
        console.log("E-R-R-O-R: " + err);
        throw err;
    });
}