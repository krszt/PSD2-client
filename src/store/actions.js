import authApi from "@/api/auth/authApi";
import accountApi from "@/api/account/accountApi";
import consentApi from "@/api/consent/consentApi";
import paymentApi from "@/api/payment/paymentApi";
import {use} from "buefy/src/utils/plugins";

const actions = {
    async login(context, formData){
        let response = await authApi.login(formData);
        if(response.successfull === true){
            context.commit("setAuth", ['username', response.username]);
            context.commit("setAuth", ['status', 'success']);
            context.commit("setAuth", ['token', localStorage.getItem('token')])
        }else{
            context.commit("setAuth", ['status', 'error']);
            localStorage.removeItem('token')
        }
    },

    async register(context, formData){
        let response = await authApi.register(formData);
        if(response.successfull === true){
            context.commit("setAuth", ['username', response.username]);
            context.commit("setAuth", ['status', 'success']);
            context.commit("setAuth", ['token', localStorage.getItem('token')])
        }else{
            if(response.userCheck !== 'OK'){
                context.commit("setAuth", ['status', 'error']);
                context.commit("setRegister", ['state', response.userCheck]);
                localStorage.removeItem('token')
            }
        }
    },

    async logout(context){
        context.commit("logout")
        await authApi.logout()
    },

    async getAccount(context){
        let isSuccessfull = await accountApi.getAccount();
        return isSuccessfull;
    },

    async getNewAuthCode(context, id){
        await accountApi.getNewAuthCode(id);
    },

    async getAccountById(context, data){
        let response = await accountApi.getAccountById(data);
        console.log(response.data);
        if(response.status === 200){
            context.commit("setAccountData", ['iban', response.data.iban]);
            context.commit("setAccountData", ['accountNumber', response.data.accountNumber]);
            context.commit("setAccountData", ['currency', response.data.currency]);
            context.commit("setAccountData", ['name', response.data.name]);
            context.commit("setAccountData", ['balances', response.data.balances]);
            context.commit("setAccountData", ['transactions', response.data.transactions]);
            context.commit("setAccountAddResponseCode", 200);
        }else if(response.status === 403){
            context.commit("setAccountAddResponseCode", 403);
        }else if(response.status === 403){
            context.commit("setAccountAddResponseCode", 403);
        }else{
            context.commit("setAccountAddResponseCode", 500);
        }
    },

    async getBalances(context, formData){
        let isSuccessfull = await accountApi.getBalances(formData);
        return isSuccessfull;
    },

    async getTransactions(context, formData){
        let isSuccessfull = await accountApi.getTransactions(formData);
        return isSuccessfull;
    },

    async getConsent(context, data){
        let response = await consentApi.getConsent(data);

        context.commit("setAccountData", ['id', response.account.accountId])


    },

    async getConsentById(context, formData){
        let isSuccessfull = await consentApi.getConsentById(formData);
        return isSuccessfull;
    },

    async getConsentStatusById(context, formData){
        let isSuccessfull = await consentApi.getConsentStatusById(formData);
        return isSuccessfull;
    },

    async deleteConsentById(context, formData){
        let isSuccessfull = await consentApi.deleteConsentById(formData);
        return isSuccessfull;
    },

    async pay(context, formData){
        console.log(formData);
        let response = await paymentApi.pay(formData);
        return response;
    },

    async getPayments(context, username){
        let response = await paymentApi.getPayments(username);

        console.log(response)

        if(response.status === 200) {
            context.commit("setPaymentData", response.data);
            context.commit("setPaymentAddResponseCode", 200);
        }else if(response.status === 404){
            context.commit("setPaymentAddResponseCode", 404);
        }else if(response.status === 403){
            context.commit("setPaymentAddResponseCode", 403);
        }else{
            context.commit("setPaymentAddResponseCode", 500);
        }    },

    async deletePaymentById(context, id){
        let isSuccessfull = await paymentApi.deletePaymentById(id);
        return isSuccessfull;
    }
}

export default actions;