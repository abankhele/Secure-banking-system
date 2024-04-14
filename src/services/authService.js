
import authHeader from "./authHeader";
import { api } from "../utils/create";
import { API_URL } from '../utils/config';
import axios from "axios";


const signup = (firstName, lastName, emailid, password) => {
    return axios
        .post(`${API_URL}/api/v1/auth/signup`, {
            firstName: firstName,
            lastName: lastName,
            email: emailid,
            password: password,
        }, {
            headers: {
                "Content-Type": "application/json",

                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));


            }

            return response.data;
        });
};

const login = async (email, password) => {
    const loginvar = {
        email: email,
        password: password
    }
    console.log("the params", loginvar)
    return await axios.post(`${API_URL}/api/v1/auth/signin`, {
        email: email,
        password: password
    }, {
        headers: {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*"
        }
    })

        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const validateotp = (username, code) => {
    console.log('username', username);
    console.log('code', code);

    const config = {
        headers: authHeader()

    };
    console.log(config);

    const payload = {
        username: username,
        code: code

    };
    return axios.post(`${API_URL}/api/v1/auth/validate/key`, payload, config)
        .then((response) => {
            return response.data;
        });
};



const getQRCode = async (userName) => {
    try {
        const config = {
            headers: authHeader(),
            responseType: 'blob'
        };

        const payload = {
            userName: userName,
        };

        const response = await axios.post(`${API_URL}/api/v1/auth/generate/`, payload, config);


        const srcForImage = URL.createObjectURL(response.data);
        return srcForImage;
    } catch (error) {
        console.error('Error fetching QR code:', error);
        throw error;
    }
};

const loggingoff = async () => {

    const config = {
        headers: authHeader()
    };


    return axios.post(`${API_URL}/api/v1/auth/signout`, {}, config)
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
    getQRCode,
    loggingoff


};

export default authService;