<template>
   <div class="hello">
   <h2>Sign Up</h2>
            <form>
           <label for="email">Email</label>
           <input type="text" name="email" id="" v-model="email">
           <label for="email">Password</label>
           <input type="text" name="password" id="" v-model="password">
           <label for="email">Confirm Password</label>
           <input type="text" name="confirmPassword" id="" v-model="confirmPassword">
           <p v-if="feedback">{{feedback}}</p>
           <button @click.prevent="SignUp">Sign up</button>
            </form>
            <p>or</p>
            <button class="facebook">Login With Facebook</button>
            <button class="twitter">Login With Twitter</button>
         
            <p>Forget Your Password?</p>
            <router-link :to="{name:'signin'}">
                <p>Already have account</p>
            </router-link>
             
  
      
  </div>
</template>

<script>
import db from "@/firebase/init"
import firebase from "firebase"
import slugify from "slugify"
export default {
data(){
    return {
         email:null,
      password:null,
      confirmPassword:null,
      feedback:null,
      id:null
    }
},
methods:{
    SignUp(){
        firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
        .then((res)=>{
            db.collection("Users").add({
                id:res.user.uid,
                name:this.email,
                email:this.email,
                password:this.password
            }
            
            ).then((doc)=>{
                this.id=doc.id;
                this.$router.push({name:'main'})
            }).catch(err=>{
                console.log(err);
                console.log("added user error");
                
            })
            
        }).catch(err=>{
            console.log(err);
            this.feedback=err.message
            throw new Error("Cant add new Data")
        })
    }
}
}
</script>

<style>
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