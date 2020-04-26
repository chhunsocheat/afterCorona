import db from "../../firebase/init"
import router from '../../router/index'
import firebase from 'firebase'

const imagePosts={
    namespaced: true, 
    state:{
       imagePosts:"HI",
       isLoading:false,
    },
    getters:{
      
    },
    mutations:{
       
        // checkLoading(state,payload){
        //     state.isLoading=payload;
        // }
    },
    actions:{
        // loadImagePosts: (context) => {
        //     console.log("hi");
            
        //     context.commit('checkLoading',true)
        //     const allImagePosts=[]
        //     db.collection("PostsImage")
        //     .orderBy('like', "desc")
        //     .get()
        //     .then(allDoc=>{
        //         allDoc.forEach(doc=>{
        //             console.log(doc.data());
                    
        //             const postObj={
        //                 id:doc.id,
        //                 post:doc.data().post,
        //                 comments:doc.data().comments,
        //                 like:doc.data().like,
        //                 userName:doc.data().userName,
        //                 imgUrl:doc.data().imgUrl,
        //                 date:doc.data().date,
        //                 postImage:doc.data().postImage
        //             }
        //             allImagePosts.push(postObj)
        //         })
        //            // console.log("all cmt",allCmt);
                    
        //        let isLoading=false;
        //            context.commit('checkLoading',isLoading)
        //     })
        //         context.commit('loadImagePosts', allImagePosts);
        // },
    }
}
export default imagePosts;