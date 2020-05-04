<template>
<div>
  <div style="height:90vh;"></div>
  <div class="biggest-container">
    <div class="tab">
      <div id="b1" :class="{active:activeTab===1}" @click="component='form-status';activeTab=1">
        <svg class="post-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <g fill="inherit">
            <path
              d="M15.6498441,5.62718315 L4.38195636,5.62718315 C4.0364078,5.62718315 3.75596259,5.34673795 3.75596259,5.00118939 C3.75596259,4.65564083 4.0364078,4.37519562 4.38195636,4.37519562 L15.6498441,4.37519562 C15.9953927,4.37519562 16.2758379,4.65564083 16.2758379,5.00118939 C16.2758379,5.34673795 15.9953927,5.62718315 15.6498441,5.62718315 M15.6498441,9.38314574 L4.38195636,9.38314574 C4.0364078,9.38314574 3.75596259,9.10270054 3.75596259,8.75715198 C3.75596259,8.41160342 4.0364078,8.13115821 4.38195636,8.13115821 L15.6498441,8.13115821 C15.9953927,8.13115821 16.2758379,8.41160342 16.2758379,8.75715198 C16.2758379,9.10270054 15.9953927,9.38314574 15.6498441,9.38314574 M13.1458691,13.1391083 L4.38195636,13.1391083 C4.0364078,13.1391083 3.75596259,12.8586631 3.75596259,12.5131146 C3.75596259,12.167566 4.0364078,11.8871208 4.38195636,11.8871208 L13.1458691,11.8871208 C13.4914176,11.8871208 13.7718628,12.167566 13.7718628,12.5131146 C13.7718628,12.8586631 13.4914176,13.1391083 13.1458691,13.1391083 M17.6104566,0.000751192518 L2.42134388,0.000751192518 C1.08547319,0.000751192518 0,1.08622438 0,2.42084309 L0,17.5811601 C0,18.4174878 0.423171785,19.1837041 1.13054474,19.6306637 C1.52116485,19.8748012 1.96061247,20 2.410076,20 C2.77440437,20 3.14624466,19.9173688 3.49805316,19.7470985 L7.81490616,17.5210647 L17.5278254,17.5210647 C18.8611921,17.5210647 20.0318005,16.3504563 20.0318005,15.0170896 L20.0318005,2.42084309 C20.0318005,1.08622438 18.9463273,0.000751192518 17.6104566,0.000751192518"
            />
          </g>
        </svg>
        <h3 id="b1">Status Form</h3>
      </div>
      <div id="b2" :class="{active:activeTab===2}" @click="component='form-image';activeTab=2">
      <i class="fas fa-image"></i>
        <h3 id="b2">Image Form</h3>
      </div>
    </div>
    <keep-alive>
      <component :is="component"></component>
    </keep-alive>
  </div>
  </div>
</template>

<script>
import db from "../../firebase/init";
import { mapGetters, mapActions } from "vuex";
import StatusPost from "./dynamicComponent/StatusPost";
import ImagePost from "./dynamicComponent/ImagePost";
export default {
  components: {
    "form-status": StatusPost,
    "form-image": ImagePost
  },
  data() {
    return {
      component: "form-status",
      post: null,
      feedback: null,
      activeTab: 1
    };
  },
  computed: {
    ...mapGetters("auth", ["userId", "getUserInfo"])
  },
  methods: {
    
    submitPostLocal() {
      if (this.post) {
        this.submitPost();
        this.feedback = null;
      } else {
        this.feedback = "You need to fill your wish!!";
      }
    },
    submitPost() {
      let dateObj = new Date();
      let newDate = dateObj.toLocaleString();
      //console.log("create post", this.getUserInfo.imgUrl);

      db.collection("Posts")
        .add({
          date: newDate,
          imgUrl: this.getUserInfo.imgUrl,
          userName: this.getUserInfo.userName,
          post: this.post,
          like: 0
        })
        .then(() => {
          this.$router.push({
            name: "main"
          });
        })
        .catch(err => {
          console.log(error);
        });
      this.feedback = null;
    }
  }
};
</script>

<style scoped>
.tab {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.biggest-container {
  position: fixed;
  right: 0;
  left: 0;
  top: 20%;
  margin-right: auto;
  margin-left: auto;
  min-height: 10em;
  width: 90%;
  height: 60%;
  background: #aee3fd;
  border-radius: 15px;
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
  margin-top: 20px;
}
button:hover {
  cursor: pointer;
}
.tab button {
  margin: 0;
  border: 1px solid #aee3fd;
}
#b1 {
  cursor: pointer;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px 0px 0px 0px;
}
#b2 {
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 0px 15px 0px 0px;
}
.active {
  background: #00aaff;
  border: none;
  font-weight: 700;
}
.post-logo {
  width: 15px;
  height: 15px;
}
.fa-image{
  margin-right: 15px;
}
#b1:hover,#b2:hover{
  background: #00aaff;
  transition: 1s ease all;
}
</style>