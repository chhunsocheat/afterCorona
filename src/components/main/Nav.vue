<template>
<div class="big-container">
  <nav class="container">
      <div class="logo-container">
           <router-link :to="{name:'main'}">
        <img  title="logo" src="../../assets/logo.png" alt />
      </router-link>
      </div>
    <div v-if="getisUserSignIn">
        <router-link :to="{name:'profile'}">
      
        <img  :title="getUserInfo.userName" class="profile" :src="getUserInfo.imgUrl" alt="">
    </router-link>
    </div>
  </nav>
  </div>
</template>

<script>
import firebase from 'firebase'
import {mapActions,mapGetters} from 'vuex'
export default {
data(){
    return {
      
    }
},
methods:{
checkIsSignIn(){
  var user = firebase.auth().currentUser;
  if (user) {
    return true;
  } 
  return false;
}
},
computed:{
    ...mapGetters('auth',[
        "getUserInfo",
        "getisUserSignIn"
    ])
}
};
</script>

<style scoped>
.big-container{
    display: flex;
    align-items: center;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    justify-content: center;
   box-shadow: 0 4px 6px -6px rgba(0, 0, 0, 0.411);
  background: rgb(174, 227, 253);
}

.container{
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
nav {
  width: 100%;
  box-sizing: border-box;
  border: none;
}
nav img {
  width: 100px;
  height: 100px;
  padding: 5px;
  margin: 10px;
}
.logo-container-container{
    display: flex;
    justify-content: center;
}
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
 
  border-radius: 50%;
}
.profile{
    width: 80px;
  height: 80px;
    border-radius: 50%;
    border: 2px solid var(--main-btn-color);
    box-sizing: border-box;
    padding: 0px;
}
@media only screen and (min-width: 1400px) {
    .container{
    width: 50%;
}
}
</style>