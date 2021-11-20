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

export default {
    async pay(data) {
        console.log(data)
        let response = await instance.post("/payments/domestic", data.payment, { params: {username: data.username}});
        return response;
    },

    async getPayments(username) {
        let response = await instance.get("/payments/domestic/allPayment", { params: {username: username}});
        return response;
    },

    async deletePaymentById(id) {
        let response = await instance.delete("/payments/domestic/" + id);
        return response;
    }
};