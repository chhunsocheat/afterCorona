<template>
  <div class="big-container">
    <Slide width="480"  :closeOnNavigation="true" class="slide">
      
      <ul class="container">
        <li class="first" @click="changeActiveClass(1)" :class="{active:getActiveClass===1}">
          <router-link class="router-link" :to="{name:'maincovid'}">
            <div class="inner-link">
              <i class="fas fa-home"></i>
              Main
            </div>
          </router-link>
        </li>
        <li @click="changeActiveClass(2)" :class="{active:getActiveClass===2}">
          <router-link class="router-link" :to="{name:'main'}">
            <div class="inner-link">
              <i class="fas fa-poll-h"></i>
              Status
            </div>
          </router-link>
        </li>
        <li @click="changeActiveClass(1)" :class="{active:getActiveClass===3}">
          <router-link class="router-link" :to="{name:'mainimage'}">
            <div class="inner-link">
              <i class="fas fa-images"></i>Image
            </div>
          </router-link>
        </li>
        <li>
          <router-link class="router-link" :to="{name:'profile'}">
            <div class="inner-link">
              <i class="fas fa-user"></i>Profile
            </div>
          </router-link>
        </li>
        <li>
          <router-link class="router-link" :to="{name:'profile'}">
            <div class="inner-link">
              <i class="fas fa-users"></i>Users
            </div>
          </router-link>
        </li>
      </ul>
    </Slide>
    <div v-if="getisUserSignIn" class="profile">
      <router-link :to="{name:'profile'}">
        <img :title="getUserInfo.userName" :src="getUserInfo.imgUrl" alt />
      </router-link>
    </div>
    <div v-else class="profile profile-login">
      <i class="fas fa-user"></i>
      <i class="fas fa-caret-down"></i>
    </div>
    <div @click="changeActiveClass(1)" class="logo-container">
      <router-link :to="{name:'maincovid'}">
        <img title="logo" src="../../assets/logo.png" alt />
      </router-link>
    </div>
  </div>
</template>

<script>
import { Slide } from "vue-burger-menu";

import firebase from "firebase";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Slide
  },
  data() {
    return {};
  },
  methods: {
    checkIsSignIn() {
      var user = firebase.auth().currentUser;
      if (user) {
        return true;
      }
      return false;
    }
  },
  computed: {
    ...mapGetters("auth", ["getUserInfo", "getisUserSignIn"])
  }
};
</script>
<style>
.bm-burger-bars {
  background-color: #ffffff;
}
.bm-menu {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Stay on top */
  top: 0;
  left: 0;
  background-color: #aee3fd!important; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}

</style>
<style scoped>
.profile-login{
  margin: auto;
  padding: 10px;
  border: transparent solid 1px;
  border-radius: 5px;
}
.profile-login:hover{
  cursor: pointer;
  border: rgba(119, 119, 119, 0.281) solid 1px;
}
.profile-login i{
  font-size: 24px;
  
}
.fas {
  margin-right: 5px;
}
.router-link {
  color: black;
  text-decoration: none;
}
.inner-link {
  padding: 20px 5vw 20px 5vw;
}
.active {
  background: #aee3fd;
}
.first {
  margin-top: 80px;
}
ul li:hover {
  background: #56baed;
  transition: 0.5s ease all;
  cursor: pointer;
}
ul {
  list-style-type: none;
  list-style: none;
}
ul li {
  width: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.big-container {
  display: grid;
  grid-template-areas: ". logo profile .";
  grid-template-columns: 1fr 3fr 3fr 1fr;
  grid-template-rows: auto;
  position: fixed;
  z-index: 2;
  width: 100vw;
  top: 0;
  box-shadow: 0 4px 6px -6px rgba(0, 0, 0, 0.411);
  background: rgb(174, 227, 253);
}

.container {
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

.logo-container {
  grid-area: logo;
}
.logo-container img {
  object-fit: cover;
  width: 80px;
  max-height: 80px;
}
.profile {
  grid-area: profile;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile img {
  margin-top: 15px;
  border-radius: 50%;
  object-fit: cover;
  width: 80px;
  max-height: 80px;
  border: 1px solid #56baed;
}

@media only screen and (min-width: 1400px) {
  .container {
    width: 50%;
  }
}
@media only screen and (min-width: 640px) {
  .slide {
    display: none;
  }
}
</style>