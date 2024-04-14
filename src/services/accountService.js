import axios from "axios";
import authHeader from "./authHeader";
import { API_URL } from "../utils/config";
//const API_URL = "http://localhost:8081/api/v1";


const getAllAccountsByUserId = () => {

    return axios.get(`${API_URL}/api/v1/accounts/`, { headers: authHeader() })

};
const getcustomertransaction = () => {

    return axios.get(`${API_URL}/api/v1/transactions/customer`, { headers: authHeader() })

};
const getuserdetails = () => {
    console.log("in user details");
    return axios.get(`${API_URL}/api/v1/users/`, { headers: authHeader() })

};
const listAllAccountsAdmin = () => {

    return axios.get(`${API_URL}/api/v1/accounts/all/`, { headers: authHeader() })

};
const getpendingtransactions = () => {

    return axios.get(`${API_URL}/api/v1/transactions/adminpending`, { headers: authHeader() })

};

const postService = {
    getAllAccountsByUserId,
    listAllAccountsAdmin,
    getpendingtransactions,
    getuserdetails,
    getcustomertransaction


};

export default postService;
