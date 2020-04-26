<template>
  <div class="biggest-container">
    <div class="each-post" v-for="imagePost in getImagePosts" :key="imagePost.name">
      <div class="profile">
        <img @click="viewProfile(imagePost.userIdInfo)" :src="imagePost.imgUrl" alt />
        <div class="user-info">
          <p>posted by {{imagePost.userName}}</p>

          <h4>{{imagePost.date}}</h4>
        </div>
      </div>
      <h2>{{imagePost.post}}</h2>

      <img class="postImage" :src="imagePost.postImage" alt />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["getImagePosts"])
  },
  methods: {
    ...mapActions("auth", ["loadImagePosts"]),
    viewProfile(username) {
      console.log("name", username);
    }
  },
  created() {
    console.log(this.getImagePosts);

    this.loadImagePosts();
  }
};
</script>

<style scoped>
.biggest-container {
  width: 80%;

  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
}
.each-post {
  box-shadow: 5px 5px 10px #79797957;
  width: 80%;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
.profile img {
  width: 40px;
  height: 40px;
  border: 1px solid #3498db;
  border-radius: 50%;
}
.postImage {
  width: 300px;
  height: 300px;
}
</style>