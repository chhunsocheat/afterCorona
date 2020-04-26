<template>
<div>
    <CreatePostComponent/>
  <div class="biggest-container">
      <div class="loader-container">
      <div v-if="getLoadingStatus">
        <div class="loader"></div>
        <div class="inner-loading"></div>
      </div>
    </div>
    <div class="each-post" v-for="imagePost in getImagePosts" :key="imagePost.name">
      <div class="profile">
        <img @click="viewProfile(imagePost.userIdInfo)" :src="imagePost.imgUrl" alt />
        <div class="user-info">
          <p>posted by {{imagePost.userName}}</p>

          <h4>{{imagePost.date}}</h4>
        </div>
      </div>
      <h3>{{imagePost.post}}</h3>

      <img class="postImage" v-lazy="imagePost.postImage" lazy="loading" alt />
    </div>
  </div>
    <Footer/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Footer from '../main/Footer'
import CreatePostComponent from "../../components/CreatePostComponent"

export default {
     components:{
    Footer,
    CreatePostComponent,
  },
  computed: {
    ...mapGetters("auth", ["getImagePosts","getLoadingStatus"])
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
.loader-container {
  display: flex;
  justify-content: center;
}
.loader {
  display: flex;
  justify-content: center;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 60px;
  height: 60px;
  animation: spin 0.5s linear infinite; /* Safari */
  animation: spin 0.5s linear infinite;
  margin-top: 200px;
}
img[lazy=loading]{
     margin: auto;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 60px;
  height: 60px;
  animation: spin 0.2s linear infinite; /* Safari */
  animation: spin 0.2s linear infinite;
  padding: 10px;
  margin: 50px;
}
.inner-loading {
  position: relative;
  height: 100vh;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.biggest-container {
  width: 80%;

  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
.profile {
    margin: 20px 10px 10px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
h3{
    display: flex;
    justify-content: flex-start;
    margin-bottom:10px ;
    padding-left: 30px;
}
.each-post {
  box-shadow: 5px 5px 10px #79797957;
  width: 80%;
  max-width: 60%;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  min-width: 40%;
  padding: 10px;
}
.profile img {
  width: 40px;
  height: 40px;
  border: 1px solid #3498db;
  border-radius: 50%;
}
.postImage {
 max-width: 700px;
 max-height: 500px;

}
@media only screen and (max-width: 1050px) {
.postImage{
    max-width: 400px;
    max-height: 300px;
}
.each-post{
    padding: 20px 50px 20px 50px;
}
}
</style>