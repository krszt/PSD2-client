const state = {
    auth: {
        username: "",
        status: "",
        token: localStorage.getItem('token') || ''
    },
    register: {
        state: ""
    },
    accountData: {
        iban: '',
        accountNumber: '',
        currency: '',
        name: '',
        id: '',
        balances: [],
        transactions: []
    },
    paymentData: [],
    /*paymentData: {
        debtorIban: '',
        ultimateDebtor: '',
        currency: '',
        amount: '',
        creditorIban: '',
        ultimateCreditor: '',
        requestedDate: '',
        id: ''

    },*/
    paymentAddResponseCode: 0,
    accountAddResponseCode: 0
}

export default state;