<template>
  <div>
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
          <div>
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
                <p>posted by {{imagePost.userName}}</p>

                <p style="font-size:12px;">{{imagePost.date}}</p>
              </div>
            </div>
            <h3>{{imagePost.post}}</h3>
          </div>
        </div>

        <img class="postImage" v-lazy="imagePost.postImage" lazy="loading" alt />
      
          
        </div>
          </router-link>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Footer from "../main/Footer";
import CreatePostComponent from "../../components/CreatePostComponent";
import firebase from "firebase";
import db from "../../firebase/init";
export default {
  components: {
    Footer,
    CreatePostComponent
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
.profile img {
  margin-left: auto;
  margin-right: auto;
}
.router-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: inherit;
  display: block;
  text-decoration: none;
}
.router-link:hover {
  text-decoration: none;
  cursor: pointer;
}
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
  margin: 5px 20px 10px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  margin-top: 20px;
}
button:hover {
  cursor: pointer;
}
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
img[lazy="loading"] {
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
h3 {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding-left: 30px;
}
.inner-post {
  display: flex;
  justify-content: flex-start;
}
.inner-routerlink {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.each-post {
  box-shadow: 5px 5px 10px #79797957;
  width: 80%;
  max-width: 60%;
  border-radius: 5px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  min-width: 40%;
  border: 1px solid transparent;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.each-post:hover {
  border: #3498db 1px solid;
}
.vote {
  margin-top: 15px;
}
.profile img {
  width: 40px;
  height: 40px;
  border: 1px solid #3498db;
  border-radius: 50%;
  margin-right: 10px;
}
.postImage {

  position: relative;
  margin-left: 25vw;
  margin-right: auto;
  transform: translateX(-50%);
  max-width: 700px;
  max-height: 500px;
}
.fas {
  font-weight: 800;
  font-size: 16px;
}
@media only screen and (max-width: 1050px) {
  .postImage {
    width: 300px;
    max-height: 300px;
  }
  .biggest-container {
      min-width: 360px;
  }
  .cmt{
      width: 100px;
  }
  .each-post{
    min-width: 340px;
  }
  textarea{
    padding: 0;
    margin: 0;
  }
  .postImage{
    margin-left: 6vw;
    transform: translateX(0);
  }
}
@media only screen and (max-width: 1450px) {
  .postImage {
    max-width: 500px;
    max-height: 300px;
  }
  
}
</style>