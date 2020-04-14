<template>
  <div>
    <h1>Write what you will do here</h1>
    <form action>
      <textarea name id v-model="post" cols="60" rows="20"></textarea>
      <p v-if="feedback">{{feedback}}</p>
      <router-link :to="{name:'main'}">
         <button type="submit" @click="submitPost" value="Submit">Submit</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import db from "../../firebase/init";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      post: null,
      feedback: null
    };
  },
  computed: {
    ...mapGetters('auth',["userId","getUserInfo"])
  },
  methods: {
    submitPost() {
      let dateObj = new Date();
      let newDate = dateObj.toLocaleString();
      console.log('create post',this.getUserInfo.imgUrl);
      
      if (this.post) {
        db.collection("Posts")
          .add({
            date:newDate,
            imgUrl:this.getUserInfo.imgUrl,
            userName:this.getUserInfo.userName,
            post: this.post,
            like:0
          })
          .then(() => {
            this.$router.push({
              name: "main"
            });
          })
          .catch(err=>{
            console.log(error);
            
          })
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
   margin-top:20px ;
}
button:hover {
 cursor: pointer;
  background-color: #39ace7;
}
</style>