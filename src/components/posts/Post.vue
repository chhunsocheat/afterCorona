<template>
  <div>
    <h1>Your posts</h1>
    <div class="container">
      <p>{{id}}</p>
      <div class="loader-container">
        <div class="loader" v-if="loading"></div>
      </div>
      <h1>{{post}}</h1>
      <p v-if="!loading">Number of Likes: {{like}}</p>
      <ul>
          <h3>Comments:</h3>
          <div class="cmt-container">
          <li class="cmt" v-for="(cmt,i) in comments" :key="i">{{cmt}}</li>
      </div>
      </ul>
      <h3>Add new Comment Here</h3>
      <h2 v-if="feedback">{{feedback}}</h2>
      <div class="textarea-container">
        <input v-model="another" name id cols="30" rows="10">
      </div>
      <div class="btn-container">
      <button @click="addLike">Like</button>
      <button @click="addCmt">Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../firebase/init";
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      post: null,
      id: this.$route.params.postId,
      loading: true,
      like: null,
      comments: [],
      another: null,
      feedback:null,
    };
  },
  methods: {
    getPost() {
      db.collection("Posts")
        .doc(this.id)
        .get()
        .then(res => {
          let post = res.data();
          this.post = post.post;
          this.loading = false;
          this.like = post.like;
          this.comments=post.comments
        });
    },
    addLike() {
      const increment = firebase.firestore.FieldValue.increment(1);
      db.collection("Posts")
        .doc(this.id)
        .update({
          like: increment
        })
        .then((doc) => {
          this.like++;
        });
        if(this.like===undefined){
          this.like=0;
        }
    },
    addCmt() {
      if(this.another){
        
      if(this.comments===undefined){
        this.comments=[]
      }
      
      this.comments.push(this.another);
      this.another = null;
    
      db.collection("Posts")
      .doc(this.id)
      .set({
          comments:this.comments
      },{merge:true})
      this.feedback=null
    }else{
      this.feedback="Please Input a comment"
    }
    }
  },
  created() {
    this.getPost();
  },
  computed: {
    ...mapGetters(["userId"])
  }
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
  border: 1px solid black;
  margin-bottom: 200px;
}
input {
  background: white;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 15px;
  border: 1px solid black;
  color: black;
}
h2{
  color: red;
}
.textarea-container {
  display: flex;
  justify-content: center;
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
.cmt-container{
    display: flex;
    justify-content: center;
    align-self: center;
    flex-direction: column;
}
.cmt{
    border: solid 1px black;
    padding: 10px;
}
.btn-container{
    margin-bottom: 20px;
}
li{
  list-style: none;
  margin: 10px;
}
button {
  background: white;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid black;
  color: black;
}
button:hover {
  transform: scale(1.1);
  transition: 0.5s ease all;
}
</style>