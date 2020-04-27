import db from "../../firebase/init"
import router from '../../router/index'
import firebase from 'firebase'
import moment from "moment"
const auth ={
    namespaced: true,
    state:{
        imagePosts:[],
        posts: [],
        userId:null,
        signInError:null,
        signUpError:null,
        userDocId:null,
        isLoading:true,
        userInfo:null,
        test:"hi",
        isUserSignIn:false
    },
    getters:{
        getImagePosts(state){
            return state.imagePosts;
          },
        getisUserSignIn:(state)=>{
            return state.isUserSignIn;
        },
        getUserInfo:(state)=>{
            console.log("user URL getter",state.userInfo);
            return state.userInfo
        },
        userId:(state)=>{
            console.log("inside getter",state.userId);
            
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
        },
         allPosts: state => {
            return state.posts;
        },
    },
    mutations:{
        loadPosts: (state, allPosts) => {            
            state.posts=allPosts
         },
        changeUrl:(state,payload)=>{
            state.userInfo.imgUrl=payload
        },
         checkLoading(state,isLoading){
            state.isLoading=isLoading;
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
       
        UserDocId(state,userDocId){
            state.userDocId=userDocId;
        },
        userInfo(state,payload){
            state.userInfo={
                
                userName:payload.username,
                imgUrl:payload.userProfileUrl
            }
        },
        changeUserState(state,payload){
            state.isUserSignIn=payload;
        },
        loadImagePosts(state,allImagePosts){
            state.imagePosts=allImagePosts;
        },
    },
    actions:{
        loadImagePosts: (context) => {
            console.log("hi");
            
            context.commit('checkLoading',true)
            const allImagePosts=[]
            db.collection("PostsImage")
            .orderBy('like', "desc")
            .get()
            .then(allDoc=>{
                allDoc.forEach(doc=>{
                    console.log(doc.data());
                    
                    const postObj={
                        id:doc.id,
                        post:doc.data().post,
                        comments:doc.data().comments,
                        like:doc.data().like,
                        userName:doc.data().userName,
                        imgUrl:doc.data().imgUrl,
                        date:moment(doc.data().date).fromNow(),
                        postImage:doc.data().postImage,
                        userIdInfo:doc.data().userIdInfo,
                    }
                    allImagePosts.push(postObj)
                })
                   // console.log("all cmt",allCmt);
                    
               let isLoading=false;
                   context.commit('checkLoading',isLoading)
            })
                context.commit('loadImagePosts', allImagePosts);
        },
        loadPosts: (context) => {
            console.log("load post");
            
            context.commit('checkLoading',true)
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
                        like:doc.data().like,
                        userName:doc.data().userName,
                        imgUrl:doc.data().imgUrl,
                        date:moment(doc.data().date).fromNow(),
                        userIdInfo:doc.data().userIdInfo,
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
                let userDocId=null
                let userName=null;
                let userProfileUrl=null
              db.collection("Users")
              .where("id","==",cred.user.uid)
              .get()
              .then((res)=>{
                res.forEach(user=>{
                  const profile =user.data();
                  userId=profile.id
                  userDocId=user.id;
                      userName=profile.name
                      userProfileUrl=profile.imgUrl;
                })
                router.push({name:'main'})
                console.log("profile URL",userProfileUrl);
                context.commit('changeUserState', true);
                context.commit('submitForm', userId);
                context.commit('UserDocId',userDocId)
                context.commit('userInfo',{
                    username:userName,userProfileUrl:userProfileUrl
                    })
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
              let userName=null;
              let userProfileUrl=null
              
            firebase
              .auth()
              .createUserWithEmailAndPassword(payload.email,payload.password)
              .then(res => {
                db.collection("Users")
                  .add({
                    id: res.user.uid,
                    name: payload.name,
                    email: payload.email,
                    password: payload.password,
                    imgUrl:"https://image.flaticon.com/icons/svg/2785/2785836.svg"
                  })
                  .then(doc => {
                    db.collection("Users")
                    .doc(doc.id)
                    .get()
                    .then((res)=>{
                      //console.log("inside the added doc",res.data());
                      //date=res.data().date,
                      userId=res.data().id;
                      userDocId=res.id;
                      userName=res.data().name
                      userProfileUrl=res.data().imgUrl;
                      //console.log("database error",userId);
                    router.push({name:'main'})
                    context.commit('signUp', userId);
                    context.commit('changeUserState', true);
                    context.commit('UserDocId',userDocId)
                    context.commit('userInfo',{
                       
                        username:userName,userProfileUrl:userProfileUrl
                        })
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
}
export default auth;