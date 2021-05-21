import {
    Redirect
} from "react-router";

import AuthManager from './services/auth';

export function Protect(props) {
    if (AuthManager.isAuthenticated()) {
        console.log("authenticated");
        return props.children;
    } else {
        console.log("not authenticated");
        return <Redirect to = '/signin' / >
    }
};