const mutations = {
    setAuth(state, [key, value]){
        state.auth[key] = value;
    },
    setRegister(state, [key, value]){
        state.register[key] = value;
    },
    setAccountData(state, [key, value]){
        state.accountData[key] = value;
    },
    setAccountAddResponseCode(state, value){
        state.accountAddResponseCode = value;
    },
    setPaymentData(state, value){
        state.paymentData = value;
    },
    setPaymentAddResponseCode(state, value){
        state.paymentAddResponseCode = value;
    },
    logout(state) {
        state.auth.status = ''
        state.auth.token = ''
        state.auth.username = ''
    }
}

export default mutations;