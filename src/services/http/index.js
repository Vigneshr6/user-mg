import axios from "axios";

const httpClient = axios.create({
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    }
});

export default httpClient;