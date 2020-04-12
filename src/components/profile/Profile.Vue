<template>
  <div>
      {{userId}}
    <p>Name: {{name}}</p>
    <p>Email: {{email}}</p>
    <p>Password: {{password}}</p>
    <button @click="loadProfile">Load</button>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import db from "@/firebase/init";
import firebase from "firebase";
export default {
    computed:{
         ...mapGetters([
             'allPosts',
             'userId'
         ])
     },
    data() {
    return {
      email: null,
      name: null,
      password: null,
      id: this.userId
    };
  },
  methods:{
      onLoadProfile() {
      const profile = db
        .collection("Users")
        .where("id","==",this.userId)
        .get()
        .then(users => {
            users.forEach(user=>{
                const resUser = user.data();
                (this.name = resUser.email),
                  (this.email = resUser.email),
                  (this.password = resUser.password);

            })
        });
    },
    loadProfile(){
        this.onLoadProfile();
         console.log("user ID",this.userId);
    }
  },
  created(){
    this.loadProfile();
     console.log("created",this.userId);
     
      
  }
}
</script>

<style scoped>

</style>