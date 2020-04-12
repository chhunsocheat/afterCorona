import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/auth/SignIn'
import SignUp from '@/components/auth/SignUp'
import Main from '@/components/main/Main'
import Post from '../components/posts/Post'
import CreatePost from '../components/posts/CreatePost'
import firebase from 'firebase'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'signin',
      component: SignIn
      
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/main/:userId',
      name: 'main',
      component: Main,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/main/',
      name: 'main1',
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
      path: '/createPost/:userId',
      name: 'createPosts',
      component: CreatePost,
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
