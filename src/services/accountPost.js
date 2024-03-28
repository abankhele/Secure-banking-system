import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "/api/v1/accounts";

const createAccount = (userId, accountType, initialDeposit) => {

    const config = {
        headers: authHeader()
    };

    const payload = {
        userId: userId,
        balance: initialDeposit,
        accountType: accountType,
    };

    return axios.post(`${API_URL}/create`, payload, config)
        .then((response) => {
            return response.data;
        });
};

const creditAccount = (accountId, amount) => {

    const config = {
        headers: authHeader()
    };

    const payload = {
        accountId: accountId,
        amount: amount,

    };
    console.log(payload);

    return axios.post(`/api/v1/transactions/credit`, payload, config)
        .then((response) => {
            return response.data;
        });
};

const debitAmount = (accountId, amount) => {

    const config = {
        headers: authHeader()
    };

    const payload = {
        accountId: accountId,
        amount: amount,

    };
    return axios.post(`/api/v1/transactions/debit`, payload, config)
        .then((response) => {
            return response.data;
        });
};

const updateaccount = (phoneNumber, accountId) => {

    const config = {
        headers: authHeader()
    };

    const payload = {
        phoneNumber: phoneNumber,

    };
    return axios.put(`/api/v1/accounts?accountId=${accountId}`, payload, config)
        .then((response) => {
            return response.data;
        });
};




const accountService = {
    createAccount,
    creditAccount,
    debitAmount,
    updateaccount,
};

export default accountService;
