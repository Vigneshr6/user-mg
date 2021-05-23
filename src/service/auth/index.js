import jwtDecode from "jwt-decode";
import React from "react";

export const AuthenticationContext = React.createContext();

export const isAuthenticated = () => {
    let token = localStorage.getItem('token');
    return token ? token.length > 0 : false;
}

export const getToken = () => {
    return localStorage.getItem('token');
}

export const setToken = (value) => {
    localStorage.setItem('token', value);
    console.log("token updated : " + value);
}

export const getUserId = () => {
    let decoded = jwtDecode(getToken());
    return decoded.userId;
}

export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
}