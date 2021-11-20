import axios from 'axios';
import config from 'Configuration';

const instance = axios.create({
    baseURL: config.clientApi,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    withCredentials: true
});

const instanceSca = axios.create({
    baseURL: "http://localhost:8081",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    withCredentials: true
});


export default {
    async getAccount() {
        let response = await instance.post("/accounts");
        if (response.status === 200){
            return response.data;
        }

        throw response.status;
    },

    async getAccountById(data) {
        console.log(data);
        let response = await instance.get("/accounts/" + data.id,  { params: {
                authCode: data.authCode,
            }});
        return response;
    },

    async getNewAuthCode(id) {
        alert(id);
        let response = await instanceSca.get("/sca",  { params: {
                accountId: id,
                }});

        console.log(response);
        return response;
    },


    async getBalances(formData) {
        let response = await instance.get("/accounts/" + formData.iban + "/balances");
        alert("asd")
        alert(JSON.stringify(response))
        if (response.status === 200){
            return response.data;
        }

        return response.data;
    },

    async getTransactions(formData) {
        let response = await instance.get("/accounts/" + formData.iban + "/transactions");
        alert("asd")
        alert(JSON.stringify(response))
        if (response.status === 200){
            return response.data;
        }

        return response.data;
    }
}