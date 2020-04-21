<template>
  <div class="biggest-container">

    <h1>Your posts</h1>
    <div class="container">
      <img :src="imgUrl" alt="">
      <!-- <p>{{id}}</p> -->
      <div class="loader-container">
        <div class="loader" v-if="loading"></div>
      </div>
      <h2 class="post">{{post}}</h2>
      <div class="vote-container">
        <button class="btn-vote" @click="addLike">Up Vote</button>
      <h4 class="number-of-likes" v-if="!loading">Number of Likes: {{like}}</h4>
        <button class="btn-downvote" @click="addDislike">Down Vote</button>
      </div>
      <h3>Comments:</h3>
      <ul class="cmt-container">
        <div class="cmt-container">
          <li class="cmt" v-for="(cmt,i) in comments" :key="i">
            <h4>{{cmt.comment}}</h4>
            <p class="date">Posted on: {{cmt.date}}</p>
            <p class="date">Posted by: {{cmt.userName}}</p>
          </li>
        </div>
      </ul>
      <h3>Add new Comment Here</h3>
      <h2 v-if="feedback">{{feedback}}</h2>
      <div class="textarea-container">
        <textarea v-model="another" name id cols="30" rows="10" />
      </div>
      <div class="btn-container">
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
      feedback: null
    };
  },
  methods: {
    getPost() {
      db.collection("Posts")
        .doc(this.id)
        .get()
        .then(res => {
          let post = res.data();
          this.imgUrl=post.imgUrl;
          this.post = post.post;
          this.loading = false;
          this.like = post.like;
          this.comments = post.comments;
        });
    },
    addLike() {
      const increment = firebase.firestore.FieldValue.increment(1);
      db.collection("Posts")
        .doc(this.id)
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
    addDislike() {
      const decrement = firebase.firestore.FieldValue.increment(-1);
      db.collection("Posts")
        .doc(this.id)
        .update({
          like: decrement
        })
        .then(doc => {
          this.like--;
        });
     
    },
    addCmt() {
      if (this.another) {
        if (this.comments === undefined) {
          this.comments = [];
        }
   let dateObj = new Date();
      let newDate = dateObj.toLocaleString();
        this.comments.push({
          comment: this.another,
          userId: this.getUserDocId,
          userName:this.getUserInfo.userName,
          date:newDate
        });
        this.another = null;

        db.collection("Posts")
          .doc(this.id)
          .set(
            {
              comments: this.comments
            },
            { merge: true }
          );
        this.feedback = null;
      } else {
        this.feedback = "Please Input a comment";
      }
    }
  },
  created() {
    this.getPost();
  },
  computed: {
    ...mapGetters('auth',["userId", "getUserDocId","getUserInfo"]),
    generateImg(){
      return `https://robohash.org/${this.getUserDocId}`
    },
    getDate() {
      let dateObj = new Date();

      let newDate = dateObj.toLocaleString();
      return newDate;
    }
  }
};
</script>

<style scoped>
.post{
  margin:15px;
}
.btn-downvote{
  background-color: rgb(255, 94, 94);
}
.btn-downvote:hover{
  background-color: rgb(255, 53, 53);
}
img{
  margin-top: 20px;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  border: #3498db solid 3px;
}
.date{
  font-size: 12px;
}
.biggest-container{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;
  box-shadow: 5px 5px 10px #797979;
  width: 70vw;
  border-radius: 5%;
}
input {
  background: white;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 15px;
  border: 1px solid black;
  color: black;
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
  animation: spin 0.5s linear infinite; /* Safari */
  animation: spin 0.5s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.cmt-container {
  display: flex;
  justify-content: center;
  align-self: center;
  flex-wrap: wrap;
}
.cmt {
  position: relative;

  margin-right: 20px;
  padding: 20px;
  box-shadow: 5px 5px 10px #797979;
  border-radius: 5px 5px 5px 5px;
}
.btn-container {
  margin-bottom: 20px;
}
li {
  list-style: none;
  margin: 10px;
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
  margin: 5px 20px 20px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  font-weight: 700;
}
button:hover {
  cursor: pointer;
  background-color: #39ace7;
}
.btn-upvote{
  margin-bottom: 10px;
}
@media only screen and (max-width: 900px){
  .btn-upvote{
  margin-bottom: 0px;
}
  .post{
    font-size: 18px;
  }
  .container{
    padding: 20px;
  }
  button {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 10px 20px;
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
  font-weight: 700;
}
}
</style>