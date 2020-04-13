import Vue from 'vue'
import Vuex from 'vuex'
import db from "../firebase/init"
import router from '../router/index'
import firebase from 'firebase'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)
export const strict = false;
export const store = new Vuex.Store({
    strict: false,
    state: {
        posts: [],
        userId:null,
        signInError:null,
        signUpError:null,
        isLoading:true,
        userDocId:null
    },plugins: [createPersistedState()],
    getters: {
        allPosts: state => {
            return state.posts;
        },
        userId:(state)=>{
            return state.userId;
        },
        getErrorMessage(state){
            return state.signInError;
        },
        getSignUpErrorMessage(state){
            return state.signUpError;
        },
        getLoadingStatus(state){
            return state.isLoading;
        },
        getUserDocId(state){
            return state.userDocId;
        }
    },
    mutations: {
        loadPosts: (state, allPosts) => {            
           state.posts=allPosts
        },
        submitForm:(state,userId)=>{
            state.userId=userId;
        },
        signUp(state,userId){
            state.userId=userId;
            console.log("getter",userId);
            
        },
        signInError(state,errorMessage){
            state.signInError=errorMessage
        },
        signUpError(state,errorMessage){
            state.signUpError=errorMessage
        },
        checkLoading(state,isLoading){
            state.isLoading=isLoading;
        },
        UserDocId(state,userDocId){
            state.userDocId=userDocId;
        }
    },
    actions: {
        loadPosts: (context) => {
            const allPosts=[]
            db.collection("Posts")
            .orderBy('like', "desc")
            .get()
            .then(allDoc=>{
                allDoc.forEach(doc=>{
                    console.log(doc.data());
                    
                    const postObj={
                        id:doc.id,
                        post:doc.data().post,
                        comments:doc.data().comments,
                        like:doc.data().like
                    }
                    allPosts.push(postObj)
                })
                   // console.log("all cmt",allCmt);
                    
               let isLoading=false;
                   context.commit('checkLoading',isLoading)
            })
                context.commit('loadPosts', allPosts);
        },
        submitForm(context,payload){
            const auth=firebase.auth();
            const promise=auth.signInWithEmailAndPassword(payload.email,payload.password)
            .then((cred)=>{
                let userId=null;
              db.collection("Users")
              .where("id","==",cred.user.uid)
              .get()
              .then((res)=>{
                res.forEach(user=>{
                  const profile =user.data();
                  userId=user.data().id
                })
                router.push({name:'main'})
                
                context.commit('submitForm', userId);
              })
        
            })
            .catch(err=>{
              console.log(err);
              let feedback="No user found"
              context.commit('signInError', feedback);
            })
            
          },
          signUp(context,payload) {
              let userId=null;
              let userDocId=null
            firebase
              .auth()
              .createUserWithEmailAndPassword(payload.email,payload.password)
              .then(res => {
                db.collection("Users")
                  .add({
                    id: res.user.uid,
                    name: payload.name,
                    email: payload.email,
                    password: payload.password
                  })
                  .then(doc => {
                    db.collection("Users")
                    .doc(doc.id)
                    .get()
                    .then((res)=>{
                      //console.log("inside the added doc",res.data());
                      userId=res.data().id;
                      userDocId=res.id;
                      //console.log("database error",userId);
                    router.push({name:'main'})
                    context.commit('signUp', userId);
                    context.commit('UserDocId',userDocId)
                    })
                      
                      
                })
                .catch(err => {
                    console.log(err);
                    console.log("added user error");
                });
            })
            .catch(err => {
                console.log(err);
                let feedback = err.message;
                context.commit("signUpError",feedback)
                throw new Error("Cant add new Data");
            });
            console.log("userId before commit",userId);
            
            
        }
    }
});

