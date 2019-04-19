import jwtDecode from 'jwt-decode'; //Default object exported from this module
import axios from "axios";

const urlApi = 'http://localhost:3900/api/auth';
const tokenKey = "token";

export async function login(email, password) {
    const {data: jwt} = await axios({   
        method: 'post',
        url: urlApi,
        data: {email, password}
    }).catch(err => {
        throw err;
    });
    localStorage.setItem("token", jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    }
    catch (ex) {
        return null;
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);  
}

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt
};