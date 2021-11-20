import Vue from 'vue';
import Vuex from 'vuex';
import actions from '@/store/actions';
import state from '@/store/state';
import getters from '@/store/getters';
import mutations from '@/store/mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
});

export default store;