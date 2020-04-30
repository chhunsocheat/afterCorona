import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/auth/SignIn'
import SignUp from '@/components/auth/SignUp'
import Main from '@/components/main/Main'
import Post from '../components/posts/Post'
import Profile from '../components/profile1/Profile'
import CreatePost from '../components/posts/CreatePost'
import PostImage from "../components/posts/AllPostImage"
import EachPostImage from "../components/posts/EachPostImage"
import WorldInfo from "../components/main/Covid/WorldInfo"


import firebase from 'firebase'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'maincovid',
      component: WorldInfo
      
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
      
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/main/',
      name: 'main',
      component: Main,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/posts/:postId',
      name: 'posts',
      component: Post,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/createPost',
      name: 'createPosts',
      component: CreatePost,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/mainimage',
      name: 'mainimage',
      component: PostImage,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/mainimage/:imagePostId',
      name: 'imagepost',
      component: EachPostImage,
      meta:{
        requireAuth:true
      }
    }
  ]
})

router.beforeEach((to,from,next)=>{
if(to.matched.some(rec=>rec.meta.requireAuth)){
let user=firebase.auth().currentUser
if(user){
  next();
}else{
  next({name:'signin'})
}
}else{
  next()
}

})

export default router;
