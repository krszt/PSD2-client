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
    async getConsent(data) {
        let response = await instance.post("/consents", null, { params: {
            iban: data.iban,
            username: data.username,
            pinCode: data.pinCode}});

        if (response.status === 200){
            return response.data;
        }
        if(response.status === 401){
            response = await instance.post("/consents", null, { params: {
                    iban: data.iban,
                    username: data.username,
                    pinCode: data.pinCode}});

            if (response.status === 200){
                return response.data;
            }
        }

        throw response.status;
    },

    async getConsentById(formData) {
        let response = await instance.get("/consents/" + formData.id);
        alert("asd")
        alert(JSON.stringify(response))
        if (response.status === 200){
            return response.data;
        }

        return response.data;
    },


    async getConsentStatusById(formData) {
        let response = await instance.get("/consents/" + formData.id + "/status");
        alert("asd")
        alert(JSON.stringify(response))
        if (response.status === 200){
            return response.data;
        }

        return response.data;
    },

    async deleteConsentById(formData) {
        let response = await instance.delete("/consents/" + formData.id);
        alert("asd")
        alert(JSON.stringify(response))
        if (response.status === 200){
            return response.data;
        }

        return response.data;
    }
};