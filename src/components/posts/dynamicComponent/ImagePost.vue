<template>
  <div class="main">
    <h1>What Are You Doing?</h1>
    <textarea v-model="post" name id cols="30" rows="1" placeholder="Title"></textarea>
    <p v-if="feedback">{{feedback}}</p>
    <picture-input
      ref="pictureInput"
      :crop="false"
      @change="onChange"
      width="350"
      height="250"
      accept="image/jpeg, image/png"
      size="10"
      :removable="true"
      buttonClass="btn"
      :customStrings="{
        change: 'Change',
         remove: 'Remove',
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag and Drop'
      }"
    ></picture-input>
    <p v-if="progress">uploading {{progress}}%...</p>
    <button type="submit" @click.prevent="submitPostLocal" class="btn-submit">Submit</button>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";
import db from "../../../firebase/init";
import { mapGetters, mapActions } from "vuex";
import firebase from "firebase";
export default {
  name: "app",
  data() {
    return {
      progress: null,
      post: null,
      feedback: null,
      image: null,
    };
  },
  components: {
    PictureInput
  },
  computed: {
    ...mapGetters("auth", ["allPosts", "userId", "getUserDocId", "getUserInfo"])
  },
  methods: {
    submitPostLocal() {
      if (this.post) {
        //console.log(this.image);

        this.uploadProfilePic();
        this.feedback = null;
      } else {
        this.feedback = "Need Title and Image!";
      }
    },
    submitPost(imageLink) {
      let dateObj = new Date();
      let newDate = dateObj.toLocaleString();
      db.collection("PostsImage")
        .add({
          userIdInfo:this.getUserDocId,
          postImage:imageLink,
          date: newDate,
          imgUrl: this.getUserInfo.imgUrl,
          userNameId:this.getUserDocId,
          userName: this.getUserInfo.userName,
          post: this.post,
          like: 0
        })
        .then(() => {
          this.$router.push({
            name: "mainimage"
          });
        })
        .catch(err => {
          console.log(error);
        });
      this.feedback = null;
    },
    uploadProfilePic() {
      let img = this.img;
      let storageRef = firebase.storage().ref(`ImagePost/${this.image.name}`);
      let uploadTask = storageRef.put(this.image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.progress = Math.round(progress);

          console.log(this.progress);
        },
        error => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            //this.img = downloadURL;
            this.submitPost(downloadURL);
            console.log("success");
            this.progress = null;
            // auth="hi";
          });
        }
      );
    },
    onChange(image) {
      console.log("New picture selected!");
      if (image) {
        console.log("Picture loaded.");
        this.image = this.$refs.pictureInput.file;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    }
  }
};
</script>

<style scoped>
button {
  color: #fff;
  display: inline-block;
  border-color: #3498db;
  font-weight: 400;
  background-color: #3498db;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.275rem 0.65rem;
  font-size: 0.7rem;
  line-height: 1.5;
  border-radius: 0.25rem;
}
p {
  color: red;
}
.main {
  margin-top: 20px;
}
textarea {
  padding: 10px;
  margin-bottom: 20px;
}
input {
  padding: 8px;
  border-color: rgba(0, 0, 0, 0.219);
  border-radius: 5px;
}
.btn-submit {
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
.btn {
  color: #fff;
  display: inline-block;
  border-color: #3498db;
  font-weight: 400;
  background-color: #3498db;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.275rem 0.65rem;
  font-size: 0.7rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
