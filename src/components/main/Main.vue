<template>
  <div>
    <h1>List of Wishes</h1>
             
   <AllPosts/>
   <router-link :to="{name:'profile'}">
     <button >Profile</button>
   </router-link>
    <router-link :to="{name:'createPosts'}">
            <button >Create Post</button>
        </router-link>
    <div class="btn-container">
    
    </div>
  </div>
</template>

<script>
//components
import AllPosts from '../posts/AllPosts'
import Profile from '../profile1/Profile'
//database and store
import db from "@/firebase/init";
import firebase from "firebase";
import {mapGetters,mapActions} from 'vuex'
export default {
  components:{
    AllPosts,
    Profile
  },
  data() {
    return {
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
        'loadPosts',
    ]),
    
    
  },
  created() {

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
.btn-container button,.each-cmt button, button{
   background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

button:hover{
    transform: scale(1.1);
    transition: 0.5s ease all;
}

</style>