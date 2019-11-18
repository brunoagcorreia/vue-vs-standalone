/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = 'http://bta-videostore.loc';

window.axios.defaults = {
    ...window.axios.defaults,
    timeout: 5000,
    responseType: 'json',
    withCredentials: false,
    maxRedirects: 5,
};
window.Vue = require('vue');

import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
import App from './App.vue';
import store from './store/user'
import HomePage from './pages/HomePage.vue';
import CreatePage from './pages/CreatePage.vue';
import IndexPage from './pages/IndexPage.vue';
import EditPage from './pages/EditPage.vue';
import ShowPage from './pages/ShowPage.vue';
import LoginPage from './pages/LoginPage.vue';
import LogoutPage from './pages/LogoutPage.vue';

const routes = [
    {
        name: 'home',
        path: '/',
        component: HomePage
    },
    {
        name: 'create',
        path: '/movie/create',
        component: CreatePage,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'movies',
        path: '/movie/list',
        component: IndexPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'edit',
        path: '/movie/edit/:id',
        component: EditPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'show',
        path: '/movie/show/:id',
        component: ShowPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'login',
        path: '/login',
        component: LoginPage
    },
    {
        name: 'logout',
        path: '/logout',
        component: LogoutPage
    },
];

const token = localStorage.getItem('token');
if (token) {
    console.log("has token");
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
} else {
    console.log("has no token");
}

const router = new VueRouter({ mode: 'history', routes: routes});
const app = new Vue(Vue.util.extend({ router, store }, App)).$mount('#app');

router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from);
    if(to.matched.some(() => to.meta.requiresAuth)) {
        if ( (store.getters.timeRemain) < 0) {
            console.log('token is expired');
            next('/login');
            return;
        }
        else if (store.getters.auth) {
            console.log('is LoggedIn');
            next();
            return;
        }

        console.log('is not LoggedIn');
        next('/login');
    } else {
        next();
    }
});
