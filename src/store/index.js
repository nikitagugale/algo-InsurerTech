import { createStore } from 'vuex'

export default createStore({
    state: {
        lastName: localStorage.getItem('firstName') || '',
        firstName: localStorage.getItem('lastName') || '',
        account: localStorage.getItem('account') || '',
        bankbalance: localStorage.getItem('bankbalance') || '',
    },
    mutations: {
        'UPDATE_ACCOUNT_DETAILS' (state, data) {
            state.firstName = data.first_name
            state.lastName = data.last_name
            state.account = data.account
            state.bankbalance = data.bankbalance
        }
    },
    actions: {
        updateAccount({ commit }, data) {
            localStorage.setItem('firstName', data.first_name)
            localStorage.setItem('lastName', data.last_name)
            localStorage.setItem('account', data.account)
            localStorage.setItem('bankbalance', data.bankbalance)
            commit('UPDATE_ACCOUNT_DETAILS', data)
        }
    },
    modules: {}
})