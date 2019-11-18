
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const currenTime = (new Date()).getTime();

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
        auth: !!localStorage.getItem('token'),
        expired_at: localStorage.getItem('exprired_at') || 0,
        time_remain: parseInt((parseInt(localStorage.getItem('exprired_at'), 10) - currenTime)/1000),
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading';
        },
        auth_success(state, token, user, exprired_at) {
            state.status = 'success';
            state.token = token;
            state.auth = true;
            state.user = user;
            state.expired_at = exprired_at;
        },
        auth_error(state){
            state.status = 'error';
            state.token = '';
            state.auth = false;
            state.user = {};
            state.expired_at =  0;
        },
        logout(state){
            state.status = 'logout';
            state.token = '';
            state.auth = false;
            state.user = {};
            state.expired_at =  0;
        },
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios.post('/api/auth/login', user)
                    .then(resp => {
                        const token = resp.data.access_token;
                        const user = resp.data.user;
                        var date = new Date();
                        date.setTime(date.getTime() + parseInt(resp.data.expires_in, 10) * 1000);
                        const exprired_at = date.getTime();

                        localStorage.setItem('exprired_at', exprired_at);
                        localStorage.setItem('token', token);
                        localStorage.setItem('user', JSON.stringify(user));

                        commit('auth_success', token, user, exprired_at);
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error');
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        localStorage.removeItem('exprired_at');
                        reject(err)
                    })
            })
        },
        refresh({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request');
                const headers = {
                    "Authorization": "Bearer " + localStorage.getItem('token'),
                };
                axios.post('/api/auth/refresh', {}, {params: {}, headers: headers})
                    .then(resp => {
                        const token = resp.data.access_token;
                        const user = resp.data.user;
                        var date = new Date();
                        date.setTime(date.getTime() + parseInt(resp.data.expires_in, 10) * 1000);
                        const exprired_at = date.getTime();

                        localStorage.setItem('exprired_at', exprired_at);
                        localStorage.setItem('token', token);
                        localStorage.setItem('user', JSON.stringify(user));

                        commit('auth_success', token, user, exprired_at);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit('auth_error', err);
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        localStorage.removeItem('exprired_at');
                        reject(err);
                    })
            })
        },
        logout({commit}){
            return new Promise((resolve, reject) => {
                commit('logout');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('exprired_at');
                delete axios.defaults.headers.common['Authorization'];
                resolve()
            })
        }
    },
    getters: {
        authStatus: state => state.status,
        user: state => state.user,
        auth: state => !!state.token,
        token: state => state.token,
        timeRemain: state => parseInt(state.time_remain),
    },
})
