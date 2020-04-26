import Vue from 'vue'
import Vuex from 'vuex'
import db from "../firebase/init"
import router from '../router/index'
import firebase from 'firebase'
import auth from './modules/auth'
import imagePosts from './modules/imagePost'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)
export const strict = false;
export const store = new Vuex.Store({
    strict: false,
    modules:{
        auth,
        imagePosts
    },
    state: {
       data:"hi"
      
    },
    plugins: [createPersistedState()],
    getters: {
       
        
    },
    mutations: {
      
        
    },
    actions: {
       
       
    }
});

