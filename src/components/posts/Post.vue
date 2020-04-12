<template>
  <div>
    <h1>Your posts</h1>
    <p>{{id}}</p>
    <p>{{post}}</p>
    <textarea name="" id="" cols="30" rows="10"></textarea>
    <input type="submit" name="" id="">
    <div class="loader-container">
      <div class="loader" v-if="loading"></div>
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
      post: "dummy text",
      id: this.$route.params.postId,
      loading: false
    };
  },
  methods: {
    // getPost() {
    //   db.collection("Posts")
    //     .doc(this.id)
    //     .get()
    //     .then(res => {
    //       let post = res.data();
    //       this.post = post.post;
    //       this.loading = false;
    //     });
    // }
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
.loader-container{
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
</style>