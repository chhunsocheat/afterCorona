<template>
  <div>
   <SideBar class="side-bar"/>
   <div class="top-nav">a</div>
    <CreatePostComponent />
    <div class="biggest-container">
      <div class="loader-container">
        <div v-if="getLoadingStatus">
          <div class="loader"></div>
          <div class="inner-loading"></div>
        </div>
      </div>

      <div class="each-post" v-for="imagePost in getImagePosts" :key="imagePost.name">
        <router-link class="router-link" :to="{name:'imagepost',params:{imagePostId:imagePost.id}}">
          <div class="wrapper-post">
            <div class="inner-post">
              <div class="vote">
                <i @click="addLike(imagePost.id)" class="fas fa-arrow-up"></i>
                <p>{{imagePost.like}}</p>
                <i @click="addDislike(imagePost.id)" class="fas fa-arrow-down"></i>
              </div>
              <div class="profile-post">
                <div class="profile">
                  <img @click="viewProfile(imagePost.userIdInfo)" :src="imagePost.imgUrl" alt />
                  <div class="user-info">
                    <p id="username">posted by {{imagePost.userName}}</p>

                    <p style="font-size:12px;">{{imagePost.date}}</p>
                  </div>
                </div>
                <h3>{{imagePost.post}}</h3>
              </div>
            </div>

            <img class="postImage" v-lazy="imagePost.postImage" lazy="loading" alt />
          </div>
            <div class="cmt-section">
              <p></p>
              <i class="fas fa-comment-alt"></i>
              <p>{{imagePost.commentLength}} Comments</p>
              <i class="fas fa-star"></i>
              <p>Give Award</p>
              <i class="fas fa-share"></i>
              <p>Share</p>
            </div>
        </router-link>
      </div>
    </div>
    
  </div>
</template>

<script>
import SideBar from '../main/SideBar'
import NavPost from "../main/NavPost"
import { mapGetters, mapActions } from "vuex";
import Footer from "../main/Footer";
import CreatePostComponent from "../../components/CreatePostComponent";
import firebase from "firebase";
import db from "../../firebase/init";
export default {
  components: {
    Footer,
    CreatePostComponent,
    NavPost,
    SideBar
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", ["getImagePosts", "getLoadingStatus"])
  },
  methods: {
    ...mapActions("auth", ["loadImagePosts"]),
    viewProfile(username) {
      console.log("name", username);
    },
    addLike(id) {
      const increment = firebase.firestore.FieldValue.increment(1);
      db.collection("PostsImage")
        .doc(id)
        .update({
          like: increment
        })
        .then(doc => {
          this.like++;
        });
      if (this.like === undefined) {
        this.like = 0;
      }
    },
    addDislike(id) {
      const decrement = firebase.firestore.FieldValue.increment(-1);
      db.collection("PostsImage")
        .doc(id)
        .update({
          like: decrement
        })
        .then(doc => {
          this.like--;
        });
    }
  },
  created() {
    console.log(this.getImagePosts);

    this.loadImagePosts();
  }
};
</script>

<style scoped>
@import "./postcss/AllPostImage.css";
.side-bar{
  margin-top: 80px;
}
.top-nav{
  height: 100px;
}
</style>