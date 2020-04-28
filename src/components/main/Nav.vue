<template>
  <div class="big-container">
    <div v-if="getisUserSignIn" class="profile">
      <router-link :to="{name:'profile'}">
        <img :title="getUserInfo.userName" :src="getUserInfo.imgUrl" alt />
      </router-link>
    </div>
    <div class="logo-container">
      <router-link :to="{name:'main'}">
        <img title="logo" src="../../assets/logo.png" alt />
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapActions, mapGetters } from "vuex";
export default {
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

<style scoped>
.big-container {
  z-index: 2;
  display: grid;
  grid-template-areas: ". logo profile .";
  grid-template-columns: 1fr 3fr 3fr 1fr;
  grid-template-rows: auto;
  position: fixed;
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
.profile{
   grid-area: profile;
}
.profile img {
  border-radius: 50%;
  object-fit: cover;
  width: 80px;
  max-height: 80px;
  border: 1px solid #56BAED;
}
@media only screen and (min-width: 1400px) {
  .container {
    width: 50%;
  }
}
</style>