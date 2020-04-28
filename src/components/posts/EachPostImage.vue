<template>
  <div>
    <SideBar/>

    <div class="top-nav"></div>
    <div class="biggest-container">
      <div class="profile">
        <img :src="imgUrl" alt />
        <div class="user-info">
          <p>posted by {{userName}}</p>

          <h4>{{date}}</h4>
        </div>
      </div>
      <div>
        <div class="post-like">
          <div>
            <i @click="addLike" class="fas fa-arrow-up"></i>
            <p>{{like}}</p>
            <i @click="addDislike" class="fas fa-arrow-down"></i>
          </div>
          <h3>{{post}}</h3>
        </div>
      </div>
      <img class="postImage" v-lazy="postImage" lazy="loading" alt />
      <h4>Comments</h4>
      <ul class="cmt-container">
        <div class="cmt-container">
          <li class="cmt" v-for="(cmt,i) in comments" :key="i">
            <p class="date" style="font-size:12px;">{{cmt.userName}}</p>
            <h4>{{cmt.comment}}</h4>
            <p v-if="!cmt.fromNow" class="date" style="font-size:12px;">seconds ago</p>
            <p class="date" style="font-size:12px;">{{cmt.fromNow}}</p>
          </li>
        </div>
      </ul>
      <h5>
        Comment as
        <p style="color:#3498db;">{{getUserInfo.userName}}</p>
      </h5>
      <h2 v-if="feedback">{{feedback}}</h2>
      <div class="textarea-container">
        <textarea v-model="another" name id cols="30" rows="10" placeholder="Your Thoughts" />
      </div>
      <div class="btn-container">
        <button @click="addCmt">Comment</button>
      </div>
      <!-- <button @click="checkDate">click for date</button> -->
    </div>
  </div>
</template>

<script>
import SideBar from "../main/SideBar"
import { mapActions, mapGetters } from "vuex";
import Footer from "../../components/main/Footer";
import moment from "moment";
import db from "../../firebase/init";
import firebase from "firebase";

export default {
  components: {
    Footer,
    SideBar
  },
  data() {
    return {
      post: null,
      id: this.$route.params.imagePostId,
      loading: true,
      like: null,
      comments: [],
      another: null,
      feedback: null,
      postImage: null,
      userID: null,
      userName: null,
      date: null,
      imgUrl: null,
      commentLength:0,
    };
  },
  computed: {
    ...mapGetters("auth", ["getUserInfo"]),
    ...mapGetters("auth", ["userId", "getUserDocId", "getUserInfo"])
  },
  methods: {
    checkDate() {
      let fromNow = moment(this.date).fromNow();
      console.log(fromNow);
    },
    getPost() {
      db.collection("PostsImage")
        .doc(this.id)
        .get()
        .then(res => {
          let post = res.data();
          this.imgUrl = post.imgUrl;
          this.post = post.post;
          this.loading = false;
          this.like = post.like;
          this.postImage = post.postImage;
          this.userID = post.userIdInfo;
          this.userName = post.userName;
          this.date = moment(post.date).fromNow();
          this.comments = post.comments;
          this.commentLength=this.comments.length;
          this.comments.map(comment => {
            //converting every date to reletive date
            let fromNow = moment(comment.date).fromNow();
            console.log("from now", fromNow);

            return (comment.fromNow = fromNow);
          });
        });
    },
    addLike() {
      const increment = firebase.firestore.FieldValue.increment(1);
      db.collection("PostsImage")
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
      db.collection("PostsImage")
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
          userName: this.getUserInfo.userName,
          date: newDate
        });
        this.another = null;

        db.collection("PostsImage")
          .doc(this.id)
          .set(
            {
              commentLength:this.commentLength+1,
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
  }
};
</script>

<style scoped>
.top-nav{
  margin-top: 80px;
}
.date {
  font-size: 12px;
  margin-top: 5px;
}
.post-like {
  margin-left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  padding-top: 10px;
  width: 55%;
  box-shadow: 5px 5px 10px #79797957;
  padding-bottom: 20px;
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
.each-post {
  box-shadow: 5px 5px 10px #79797957;
  width: 80%;
  max-width: 60%;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  min-width: 40%;
  border: 1px solid transparent;
  padding: 10px;
}
.each-post:hover {
  border: #3498db 1px solid;
  cursor: pointer;
}
.profile img {
  width: 40px;
  height: 40px;
  border: 1px solid #3498db;
  border-radius: 50%;
  margin-right: 10px;
}
.postImage {
  max-width: 700px;
  max-height: 600px;
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
@media only screen and (max-width: 1050px) {
  .postImage {
    width: 300px;
    max-height: 300px;
  }
  .biggest-container {
    min-width: 360px;
  }
  .cmt {
    width: 100px;
  }
}
@media only screen and (max-width: 1250px) {
  .postImage {
    max-width: 500px;
    max-height: 300px;
  }
}
</style>