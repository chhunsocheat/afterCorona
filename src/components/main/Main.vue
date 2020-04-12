<template>
  <div>
    <h1>This is the main page</h1>
    {{userId}}
    <p>Name: {{name}}</p>
    <p>Email: {{email}}</p>
    <p>Password: {{password}}</p>
    <router-link :to="{name:'createPosts',params:{userId:userId}}">
            <button >Create Post</button>
        </router-link>
   <AllPosts/>
    <div class="btn-container">
    <button @click="signOut">Sign Out</button>
    <button @click="loadPosts">Load All Comment</button>
    </div>
  </div>
</template>

<script>
import AllPosts from '../posts/AllPosts'
import db from "@/firebase/init";
import firebase from "firebase";
import {mapGetters,mapActions} from 'vuex'
export default {
  components:{
    AllPosts
  },
  data() {
    return {
      email: null,
      name: null,
      password: null,
      id: this.$route.params.userId
    };
  },
  computed:{
      ...mapGetters([
          'allPosts',
          'userId'
      ])
  },
  methods: {
      ...mapActions([
        'loadPosts'
    ]),
    onLoadProfile() {
      const profile = db
        .collection("Users")
        .doc(this.userId)
        .get()
        .then(user => {
          const resUser = user.data();
          (this.name = resUser.email),
            (this.email = resUser.email),
            (this.password = resUser.password);
        });
    },
    signOut(){
        firebase.auth().signOut()
        .then(()=>{
            this.$router.push({name:'signin'})
        })
    },
    
  },
  created() {
    this.onLoadProfile()

    
  },
  updated(){
  // this.onLoadProfile()
  },
  mounted() {
      console.log(firebase.auth().currentUser);
      // this.loadCmt();
  }
};
</script>

<style scoped>
ul li{

    margin: 15px;
    list-style-type: none;
}
.btn-containers{
    display: flex;
justify-content: center;
align-self: center;
background: none;
}
.btn-container button,.each-cmt button{
    background: white;
    padding: 20px;
    margin-bottom: 15px;
    border: 1px solid black;
    color: black;
}
button{
    background: white;
    padding: 20px;
    margin-bottom: 5px;
    border: 1px solid black;
    color: black;

}
button:hover{
    transform: scale(1.1);
    transition: 0.5s ease all;
}
.each-cmt{
  background: rgb(172, 127, 127);
  border-radius: 10px;
 box-shadow: 2px 2px 4px #888888;
}
</style>