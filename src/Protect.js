import {
    Redirect
} from "react-router";
import { isAuthenticated } from "./service/auth";

export function Protect(props) {
    if (isAuthenticated()) {
        console.log("authenticated");
        return props.children;
    } else {
        console.log("not authenticated");
        return <Redirect to = '/signin' / >
    }
};