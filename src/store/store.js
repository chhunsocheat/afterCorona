import Vue from 'vue'
import Vuex from 'vuex'
import db from "../firebase/init"
import router from '../router/index'
import firebase from 'firebase'
Vue.use(Vuex)
export const store = new Vuex.Store({
    strict: true,
    state: {
        posts: [
           
        ],
        userId:null
    },
    getters: {
        allPosts: state => {
            return state.posts;
        },
        userId:(state)=>{
            return state.userId;
        }
    },
    mutations: {
        loadPosts: (state, allPosts) => {            
           state.posts=allPosts
        },
        submitForm:(state,userId)=>{
            state.userId=userId;
        }
    },
    actions: {
        loadPosts: (context) => {
            const allPosts=[]
            db.collection("Posts").get()
            .then(allDoc=>{
                allDoc.forEach(doc=>{
                    console.log(doc.data());
                    
                    const postObj={
                        id:doc.id,
                        post:doc.data().post
                    }
                    allPosts.push(postObj)
                })
                   // console.log("all cmt",allCmt);
                    
               
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
                router.push({name:'main',params:{userId:userId}})
                
                context.commit('submitForm', userId);
              })
        
            })
            .catch(err=>{
              console.log(err);
              this.feedback=err.message
            })
            
          }
    }
});
