<template>
  <div>
    <NavPost/>
    <WorldInfo/>
    <CreatePostComponent />
    <h1 class="title">Top Posts</h1>
    <AllPosts />
    <Footer class="footer" />
  </div>
</template>

<script>
//components
import NavPost from "../../components/main/NavPost"
import Nav from "./Nav";
import Footer from "./Footer";
import CreatePostComponent from "../../components/CreatePostComponent";
import AllPosts from "../posts/AllPosts";
import Profile from "../profile1/Profile";
import WorldInfo from "./Covid/WorldInfo"
//database and store
import db from "@/firebase/init";
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    AllPosts,
    Profile,
    Nav,
    NavPost,
    Footer,
    CreatePostComponent,
    WorldInfo
  },
  data() {
    return {
      activeTab:2,
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