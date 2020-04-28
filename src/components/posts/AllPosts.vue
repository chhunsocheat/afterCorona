<template>
  <div class="biggest-container">
    <h1 class="title">Top Posts</h1>
    <div class="loader-container">
      <div v-if="getLoadingStatus">
        <div class="loader"></div>
        <div class="inner-loading"></div>
      </div>
    </div>
    <ul class="container">
      <li class="each-post" v-for="(post,i) in allPosts" :key="i">
        <!-- {{post.id}} -->
        <div class="profile">
          <img loading="lazy" :src="post.imgUrl" alt />
          <p>Posted by:</p>
          <h3>{{post.userName}}</h3>
          <h6>{{post.date}}</h6>
        </div>
        <div class="each-cmt">
          <p class="cmt">{{post.post}}</p>
          <span>Likes: {{post.like}}</span>
          <ul>
            <p>List of Comments:</p>
            <div class="all-cmt">
              <li v-for="(cmt,i) in post.comments" :key="i">
                <span>{{i+1}}.</span>
                {{cmt.comment}}
                <br />
              </li>
            </div>
          </ul>
          <router-link :to="{name:'posts',params:{postId:post.id}}">
            <button class="btn">View</button>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment"
export default {
  data() {
    return {
      imgSrc: `https://robohash.org/`
    };
  },
  computed: {
   
    ...mapGetters("auth", [
      "allPosts",
      "userId",
      "getLoadingStatus",
      "getUserDocId"
    ])
  },
  methods: {
    ...mapActions("auth", ["loadPosts"])
  },
  created() {
    this.loadPosts();
  }
};
</script>

<style scoped>
html {
  overflow: scroll;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
  background: #ff0000;
}
* {
}
.all-cmt {
  overflow: scroll;
  width: 200px;
  height: 150px;
}
button {
  font-weight: 750;
  letter-spacing: 1px;
}
.profile {
  margin-right: 20px;
}
.profile img {
  margin-left: 10px;
}
.biggest-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

span {
  font-size: 20px;
  color: #5cbeff;
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
li {
  list-style: none;
}
.container {
  display: grid;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  grid-template-areas: ". .  ";
  grid-gap: 20px;
}
.each-post img {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  background: white;

  border: #3498db 3px solid;
}
.each-post {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid transparent;

  box-shadow: 5px 5px 10px #797979;
  border-radius: 5px 5px 5px 5px;
}

.each-post:hover {
  border: #3498db 1px solid;
}
.each-cmt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.cmt {
  display: flex;
  justify-content: center;

  margin-top: 20px;
  height: 80px;
  width: 300px;
  overflow: scroll;
  padding: 0;
  white-space: normal;
  font-size: 16px;
  font-weight: 600;
}
.btn-containers {
  display: flex;
  justify-content: center;
  align-self: center;
  background: none;
}

.btn-container button,
.each-cmt button {
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
  margin: 5px 20px 20px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

button:hover {
  cursor: pointer;
  background-color: #39ace7;
}

@media only screen and (max-width: 1250px) {
  .cmt {
    width: 150px;
    font-size: 16px;
  }
  .each-post img {
    border-radius: 50%;
    width: 120px;
    height: 120px;

    border: #3498db 3px solid;
  }
  .each-post {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
    box-shadow: 5px 5px 10px #797979;
    border-radius: 5px 5px 5px 5px;
    padding: 10px 80px 20px 80px;
  }
  .each-cmt {
    width: 150px;
  }
  .all-cmt {
    overflow: scroll;
    width: 100px;
    height: 120px;
    font-size: 12px;
  }
  .container {
    display: grid;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-template-areas: ".";
    padding: 0px;
  }
  .btn-container button,
  .each-cmt button {
    margin: 0px;
    padding: 15px 25px;
  }
  span {
    font-size: 14px;
  }
  .each-cmt ul {
    padding: 0;
  }
}
@media only screen and (max-width: 800px) {
.each-post{
    padding: 10px 20px 20px 0px;

}
}
</style>