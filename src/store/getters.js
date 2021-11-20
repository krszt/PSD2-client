const getters = {
    isLoggedIn(state) {
        return state.auth.token !== null && state.auth.token !== '';
    },
    authStatus(state) {
      return state.auth.status
    },
    auth(state) {
      return state.auth
    },
    getToken(state){
      return state.auth.token
    },
    getUsername(state){
        return state.auth.username;
    },
    getRegisterState(state){
        return state.register.state;
    },
    getAccountData(state){
        return state.accountData;
    },
    getAccountAddResponseCode(state){
        return state.accountAddResponseCode;
    },
    getPaymentData(state){
        return state.paymentData;
    },
    getPaymentAddResponseCode(state){
        return state.paymentAddResponseCode;
    }
}

export default getters;