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
        allCmt: state => {
            return state.posts;
        },
        userId:(state)=>{
            return state.userId;
        }
    },
    mutations: {
        loadCmt: (state, allCmt) => {            
           state.posts=allCmt
        },
        submitForm:(state,{userId,...payload})=>{
            state.userId=userId;
        }
    },
    actions: {
        loadCmt: (context) => {
            const allCmt=[]
            db.collection("Comment").get()
            .then(allDoc=>{
                allDoc.forEach(doc=>{
                    console.log(doc.data());
                    
                    const cmt=doc.data();
                    const cmtObj={
                        id:doc.id,
                        comment:doc.data().comment
                    }
                    allCmt.push(cmtObj)
                })
                   // console.log("all cmt",allCmt);
                    
               
            })
                context.commit('loadCmt', allCmt);
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
                  userId=user.id
                })
                router.push({name:'main',params:{userId:userId}})
                
                context.commit('submitForm', {userId,...payload});
              })
        
            })
            .catch(err=>{
              console.log(err);
              this.feedback=err.message
            })
            
          }
    }
});
