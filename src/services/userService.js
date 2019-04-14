import axios from "axios";

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
