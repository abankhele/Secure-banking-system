import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8081/api/v1";


const getAllAccountsByUserId = () => {

    return axios.get("/api/v1/accounts/", { headers: authHeader() })

};
const listAllAccountsAdmin = () => {

    return axios.get("/api/v1/accounts/all/", { headers: authHeader() })

};
const getQRCode = (userName) => {
    const config = {
        headers: authHeader(),
    };
    console.log("confog", config)
      return axios.get("api/v1/auth/generate", config)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error fetching QR code:', error);
            throw error; 
        });
};

const postService = {
    getAllAccountsByUserId,
    listAllAccountsAdmin,
    getQRCode,
};

export default postService;
