<template>
  <div class="create-post-container">
    <router-link :to="{name:'createPosts'}">
      <div class="create-post">
        <img :src="getUserInfo.imgUrl" alt />
        <textarea cols="20" rows="1" placeholder="Create Post" />
        <button>Submit</button>
      </div>
    </router-link>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", ["allPosts", "userId", "getUserInfo"])
  }
};
</script>


<style scoped>
.title {
  margin: 20px 0px;
  font-size: 40px;
}
.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.file-input__label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  font-size: 6px;
  color: #fff;
  background-color: #86c1df;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}
.file-input__label:hover {
  background: #73bbdf;
  transition: 0.5s ease all;
}

.file-input__label svg {
  height: 16px;
  margin-right: 4px;
}
.btn-sm-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
}
.create-post-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.create-post {
  padding: 10px 20px;
  margin: 20px;
  box-shadow: 5px 5px 10px #797979;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.create-post img {
  margin-right: 20px;
  width: 50px;
  height: 50px;
  border: #56baed 1px solid;
  border-radius: 50%;
}
.create-post input {
  margin: 50px;
}

ul li {
  margin: 15px;
  list-style-type: none;
}
button{
  margin-left: 10px;
   background-color: #56baed;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 10px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;

  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
footer {
  margin-top: 30px;
}
@media only screen and (max-width: 900px) {
  textarea {
  }
  .btn-sm-container {
    display: none;
  }
}
</style>