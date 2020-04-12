<template>
  <div>
    <h1>Create Your Post here</h1>
    <form action>
      <textarea name id v-model="post"></textarea>
      <p v-if="feedback">{{feedback}}</p>
      <router-link :to="{name:'main'}">
         <button type="submit" @click="submitPost" value="Submit">Submit</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import db from "../../firebase/init";
import { mappGetters, mapGetters } from "vuex";
export default {
  data() {
    return {
      post: null,
      feedback: null
    };
  },
  computed: {
    ...mapGetters(["userId"])
  },
  methods: {
    submitPost() {
      if (this.post) {
        db.collection("Posts")
          .add({
            post: this.post
          })
          .then(() => {
            this.$router.push({
              name: "main",
              params: { userId: this.userId }
            });
          });
      } else {
        this.feedback = "Please Enter a post before submitting";
      }
    }
  }
};
</script>

<style scoped>
input {
    margin-top: 20px;
}
form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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