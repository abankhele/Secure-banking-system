import axios from "axios";
import authHeader from "./authHeader";
import { API_URL } from "../utils/config";


const createAccount = (accountType, initialDeposit) => {

    const config = {
        headers: authHeader()
    };

    const payload = {
        balance: initialDeposit,
        accountType: accountType,
    };

    return axios.post(`${API_URL}/api/v1/accounts/create`, payload, config)
        .then((response) => {
            return response.data;
        });
};

const creditAccount = (accountId, amount) => {

    const config = {
        headers: authHeader()
    };

    const payload = {
        toAccountId: accountId,
        amount: amount,

    };
    console.log(payload);

    return axios.post(`${API_URL}/api/v1/transactions/credit`, payload, config)
        .then((response) => {
            return response.data;
        });
};

const debitAmount = (accountId, amount) => {

    const config = {
        headers: authHeader()
    };

    const payload = {
        fromAccountId: accountId,
        amount: amount,

    };
    console.log(payload);
    return axios.post(`${API_URL}/api/v1/transactions/debit`, payload, config)
        .then((response) => {
            return response.data;
        });
};

const transferamount = (amount, fromAccountId, toAccountId) => {

    const config = {
        headers: authHeader()
    };

    const payload = {

        amount: amount,
        fromAccountId: fromAccountId,
        toAccountId: toAccountId
    };
    console.log(payload);
    return axios.post(`${API_URL}/api/v1/transactions/transfer`, payload, config)
        .then((response) => {
            return response.data;
        });
};

const requestamount = (amount, fromAccountId, toAccountId) => {

    const config = {
        headers: authHeader()
    };

    const payload = {

        amount: amount,
        fromAccountId: fromAccountId,
        toAccountId: toAccountId
    };
    console.log(payload);
    return axios.post(`${API_URL}/api/v1/transactions/requestFunds`, payload, config)
        .then((response) => {
            return response.data;
        });
};
const updateaccount = (userDetails) => {

    const config = {
        headers: authHeader()
    };

    console.log(userDetails);
    return axios.put(`${API_URL}/api/v1/users/`, userDetails, config)
        .then((response) => {
            return response.data;
        });
};

const approvetransaction = (transactionId, approve) => {

    const config = {
        headers: authHeader()
    };

    const payload = {
        transactionId: transactionId,
        approve: approve,

    };
    return axios.post(`${API_URL}/api/v1/transactions/approveTransaction`, payload, config)
        .then((response) => {
            return response.data;
        });
};


const accountService = {
    createAccount,
    creditAccount,
    debitAmount,
    updateaccount,
    approvetransaction,
    transferamount,
    requestamount

};

export default accountService;
