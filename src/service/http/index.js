import axios from "axios";
import {
    getToken
} from "../auth";

export const httpClient = axios.create({
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    }
});

httpClient.interceptors.request.use(config => {
    console.log(config);
    let token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

httpClient.interceptors.response.use(res => {
    return res;
}, error => {
    if (error.response && error.response.status === 401) {
        window.location.href = "/signin";
    }
    return Promise.reject(error)
})