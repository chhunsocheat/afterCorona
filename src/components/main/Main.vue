<template>
  <div class="container">
    
    <div class="top-nav">a</div>
    <SideBar class="side-bar"/>
    <div class="main">
   
    <WorldInfo class="world-info"/>
    <CreatePostComponent class="createpost"/>
    
    <AllPosts class="all-post"/>
    </div>
  </div>
</template>

<script>
//components
import SideBar from './SideBar'
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
    WorldInfo,
    SideBar
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
    //console.log(this.userInfo);
  },
  updated() {
    // this.onLoadProfile()
  },
  mounted() {
    //console.log(firebase.auth().currentUser);
    // this.loadCmt();
  }
};
</script>

<style scoped>
@import './maincss/main.css';

.top-nav{
  height: 90px;
}
.title {
  margin: 20px 0px;
  font-size: 40px;
}

.side-bar{
  margin-top: -10px;
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
  .side-bar{
    display: none;
  }
}
</style>