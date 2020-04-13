<template>
  <div>
    <div class="loader-container">
      <div class="loader" v-if="getLoadingStatus"></div>
    </div>
    <ul class="container">
      <li class="each-post" v-for="(post,i) in allPosts" :key="i">
        <!-- {{post.id}} -->
        <img :src=randomGenerator(i) alt />

        <div class="each-cmt">
          <h2>After Corona, {{post.post}}</h2>
          <span>Likes: {{post.like}}</span>
          <ul>
            <p>List of Comments:</p>
            <li v-for="(cmt,i) in post.comments" :key="i">
              <span>{{i+1}}.</span>
              {{cmt}}
              <br />
            </li>
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

export default {
  data(){
    return{
      imgSrc:`https://robohash.org/`
    }
  },
  computed: {
    ...mapGetters(["allPosts", "userId", "getLoadingStatus"]),
   
  },
  methods: {
    ...mapActions(["loadPosts"]),
     randomGenerator(i){
      let random=Math.random()*1;
      return `https://robohash.org/${i}`
    }
  },
  created() {
    this.loadPosts();
  }
};
</script>

<style scoped>
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
  animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.each-post img {
  border-radius: 50%;
  width: 200px;
  height: 200px;

  border: #3498db 2px solid;
}
.each-post {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
  width: 80%;
  box-shadow: 5px 5px 10px #797979;
  border-radius: 5px 5px 5px 5px;
}

.each-post:hover {
  transition: 0.5s ease all;
}
.each-cmt{
  width: 70%;
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
  margin: 5px 20px 40px 20px;
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
</style>