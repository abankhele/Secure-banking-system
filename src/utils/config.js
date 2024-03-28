import axios from 'axios';
export const API_URL = "http://localhost:8081/api/v1"
const instance = axios.create({
    baseURL: "http://localhost:8081/api/v1",
});

export default instance;
