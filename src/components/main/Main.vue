<template>
  <div>
    <h1>This is the main page</h1>
    {{userId}}
    <p>Name: {{name}}</p>
    <p>Email: {{email}}</p>
    <p>Password: {{password}}</p>
    <router-link :to="{name:'createPosts',params:{userId:id}}">
            <button >Create Post</button>
        </router-link>
    <ul>
        <li class="each-cmt" v-for="(cmt,i) in allCmt" :key="i">
            {{cmt.id}}
            <p>{{cmt.comment}}</p>
        <router-link :to="{name:'posts',params:{cmtId:cmt.id}}">
            <button >View</button>
        </router-link>
          
         <button  >Like</button>   
         <button  >Dislike</button>
         <button  >Comment</button>      
        </li>
    </ul>
    <div class="btn-container">
    <button @click="signOut">Sign Out</button>
    <button @click="loadCmt">Load All Comment</button>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
import {mapGetters,mapActions} from 'vuex'
export default {
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
          'allCmt',
          'userId'
      ])
  },
  methods: {
      ...mapActions([
        'loadCmt'
    ]),
    onLoadProfile() {
      const profile = db
        .collection("Users")
        .doc(this.$route.params.userId)
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
    //loadCmt();
    
  },
  mounted() {
      console.log(firebase.auth().currentUser);
  }
};
</script>

<style scoped>
ul li{
    border: 1px solid black;
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
</style>