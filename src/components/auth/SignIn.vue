<template>
  <div class="hello">
   <h2>Login</h2>
 
            <form>
           <label for="email">Email</label>
           <input type="text" name="email" id="" v-model="email">
           <label for="email">Password</label>
           <input type="text" name="email" id="" v-model="password">
           <p v-if="feedback">{{feedback}}</p>
           <button @click.prevent="submitForm({email,password})">Sign In</button>
            </form>
            <p>or</p>
            <button class="facebook">Login With Facebook</button>
            <button class="twitter">Login With Twitter</button>
         
            <p>Forget Your Password?</p>
            <router-link :to="{name:'signup'}">I dont have an account</router-link>
  
      
  </div>
</template>

<script>
import db from "@/firebase/init"
import firebase from "firebase"
import {mapGetters,mapActions} from 'vuex'

export default {
  name: 'SignIn',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      foods:[],
      email:"",
      password:"",
      feedback:null,
    }
  },
  computed:{
    
  },
  methods:{
    ...mapActions([
      'submitForm'
    ])
  },
  mounted(){
    db.collection("Foods").get()
    .then(res=>{
      res.forEach(element => {
        let food=element.data();
        food.id=element.id;
        this.foods.push(food)
        
        
      });
      
    })
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
form button{
  margin: 10px;
}
</style>
