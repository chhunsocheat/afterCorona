<template>
  <div>
    <router-link :to="{name:'mainimage'}">
      <button>Post image</button>
    </router-link>
    <div class="create-post-container">
      <router-link :to="{name:'createPosts'}">
        <div class="create-post">
          <img :src="getUserInfo.imgUrl" alt />
          <textarea cols="30" rows="1" placeholder="Create Post" />

          <div class="btn-sm-container">
            <div class="file-input">
              <input type="file" name="file-input" id="file-input" class="file-input__input" />
              <label class="file-input__label" for="file-input">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="upload"
                  class="svg-inline--fa fa-upload fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                  />
                </svg>
              </label>
            </div>
            <button class="btn-sm-submit">--></button>
          </div>
        </div>
      </router-link>
    </div>
<h1 class="title">Top Posts</h1>
    <AllPosts />
    <Footer class="footer" />
  </div>
</template>

<script>
//components
import Nav from "./Nav";
import Footer from "./Footer";

import AllPosts from "../posts/AllPosts";
import Profile from "../profile1/Profile";
//database and store
import db from "@/firebase/init";
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    AllPosts,
    Profile,
    Nav,
    Footer
  },
  data() {
    return {
      id: this.$route.params.userId
    };
  },
  computed: {
    ...mapGetters("auth", ["allPosts", "userId", "getUserInfo"])
  },
  methods: {
    ...mapActions("auth", ["loadPosts"]),
    loadImgUrl() {
      return this.userInfo.imgUrl;
    }
  },
  created() {
    console.log(this.userInfo);
  },
  updated() {
    // this.onLoadProfile()
  },
  mounted() {
    console.log(firebase.auth().currentUser);
    // this.loadCmt();
  }
};
</script>

<style scoped>
.title{
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
.btn-containers {
  display: flex;
  justify-content: center;
  align-self: center;
  background: none;
}
.btn-container button,
.each-cmt button,
button {
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

  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.btn-container {
  margin-top: 50px;
  margin-bottom: 50px;
}
button:hover {
  background-color: var(--main-btn-color-hover);
  cursor: pointer;
  transition: 0.5s ease all;
}
.btn-sm-submit {
  margin-left: 5px;
  background-color: var(--main-btn-color);
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 10px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  padding: 13px;
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