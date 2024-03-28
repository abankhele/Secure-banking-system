import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "http://localhost:8081/api/v1/auth";

const signup = (firstName, lastName, emailid, password) => {
    return axios
        .post("/api/v1/auth/signup", {
            firstname: firstName,
            lastname: lastName,
            email: emailid,
            password: password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));


            }

            return response.data;
        });
};

const login = (email, password) => {
    return axios
        .post("/api/v1/auth/signin", {
            email: email,
            password: password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};
const validateotp = (username, code) => {
    return axios
        .post("/api/v1/auth/validate/key", {
            username: username,
            code: code,
        })
        .then((response) => {
            return response.data;
        });
};




const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const authService = {
    signup,
    login,
    logout,
    getCurrentUser,
    validateotp,
    

};

export default authService;