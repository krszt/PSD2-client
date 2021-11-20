import axios from 'axios';
import config from 'Configuration';
import jwt from 'jsonwebtoken'

const instance = axios.create({
    baseURL: config.clientApi,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    withCredentials: true
});

export default {
    async login(formData) {
        let response = await instance.post("/login", formData);
        if (response.status === 200){
            const token = jwt.sign({ username: response.data.username }, config.secret, {expiresIn: 86400});
            localStorage.setItem('token', token)
            instance.defaults.headers.common['Authorization'] = token
            return response.data;
        }

        throw response.status;
    },

    async register(formData) {
        let response = await instance.post("/register", formData);
        if (response.status === 200){
            const token = jwt.sign({ username: response.data.username }, config.secret, {expiresIn: 86400});
            localStorage.setItem('token', token)
            instance.defaults.headers.common['Authorization'] = token
            return response.data;
        }

        throw response.data;
    },

    logout() {
        localStorage.removeItem('token')
        delete instance.defaults.headers.common['Authorization']
    }
}