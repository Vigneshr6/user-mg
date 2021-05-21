import axios from "axios";

class AuthManager {
    constructor() {
        this.token = '';
    }

    isAuthenticated() {
        return this.token ? this.token.length > 0 : false;
    }

    getToken() {
        return this.token;
    }

    setToken(value) {
        this.token = value;
        axios.interceptors.request.use(config => {
            config.headers.Authorization = this.token;
        });
    }
}

const authManger = new AuthManager();
// authManger.setToken('hello')
// console.log(`token test : ${authManger.getToken()}`);
// console.log(`isAuth test : ${authManger.isAuthenticated()}`);
export default authManger;