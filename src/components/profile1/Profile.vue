<template>
  <div class="container">
    <div class="profile-container">
      <img :src="img" alt />
      <h1>Profile</h1>
      <div class="info-container">
        <div>
          <h3>Email:</h3>
          <p>{{email}}</p>
        </div>
        <div>
          <h3>Name:</h3>
          <p>{{name}}</p>
        </div>
        <div>
          <h3>Likes:</h3>
          <p>32</p>
        </div>
        <div>
          <h3>Comments:</h3>
          <p>3</p>
        </div>
      </div>
      <div class="file-input">
        <input
          @change="uploadProfile($event)"
          type="file"
          name="file-input"
          id="file-input"
          class="file-input__input"
        />
        <label class="file-input__label" for="file-input">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="upload"
            class="svg-inline--fa fa-upload fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
            />
          </svg>
          <span>file</span>
        </label>
      </div>

      <button @click="uploadProfilePic">Upload</button>
      <button class="btn-signout" @click="signOut">Sign Out</button>
    </div>
  </div>
</template>

<script>
import auth from "../../store/modules/auth";
import { mapGetters, mapActions } from "vuex";
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  computed: {
    ...mapGetters("auth", ["allPosts", "userId", "getUserDocId"])
  },
  data() {
    return {
      email: null,
      name: null,
      password: null,
      id: this.userId,
      img: null,
      file: null
    };
  },
  methods: {
    click() {
      const auth = this.$store.state;
      console.log("auth store", auth);
    },
    uploadProfile(event) {
      this.file = event.target.files[0];
    },
    uploadProfilePic() {
      let img = this.img;
      let storageRef = firebase.storage().ref(`photo/${this.file.name}`);
      let uploadTask = storageRef.put(this.file);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {},
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            db.collection("Users")
              .doc(this.getUserDocId)
              .update({
                imgUrl: downloadURL
              });

            this.img = downloadURL;
            console.log("img url", this.img);
            const auth = this.$store.state.auth.userInfo.imgUrl;
            this.$store.commit("auth/changeUrl", this.img);
            // auth="hi";
          });
        }
      );
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "signin" });
          this.$store.commit("auth/changeUserState", false);
        });
    },
    onLoadProfile() {
      const profile = db
        .collection("Users")
        .where("id", "==", this.userId)
        .get()
        .then(users => {
          users.forEach(user => {
            const resUser = user.data();
            (this.name = resUser.name),
              (this.email = resUser.email),
              (this.password = resUser.password),
              (this.img = resUser.imgUrl);
          });
        });
    },
    loadProfile() {
      this.onLoadProfile();
    }
  },
  created() {
    this.loadProfile();
    console.log("created", this.userId);
  }
};
</script>

<style scoped>
.btn-signout {
  background-color: rgb(255, 94, 94);
}
.btn-signout:hover {
  background-color: rgb(255, 53, 53);
}

.info-container {
  display: grid;
  grid-gap: 60px;
  grid-template-areas: ". .";
  margin-bottom: 30px;
}
p {
  margin: 0;
  margin-bottom: 10px;
}
.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.file-input__label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  padding: 5px 6px;
  background-color: #86c1df;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}

.file-input__label svg {
  height: 16px;
  margin-right: 4px;
}
input[type="submit"] {
  padding: 5px 15px;
  background: #ccc;
  border: 0 none;
  cursor: pointer;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
img {
  width: 300px;
  height: 300px;
  margin: 30px;
  border-radius: 50%;
  border: 6px solid #56baed;
}
.container {
  display: flex;
  justify-content: center;
}
.profile-container {
  margin-top: 50px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5%;
  width: 50%;
  box-shadow: 0 10px 30px 0 rgba(51, 52, 53, 0.4);
}
.profile-container img {
  width: 300px;
  height: 300px;
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
}
button:hover {
  transform: scale(1.1);
  transition: 0.5s ease all;
}

@media only screen and (max-width: 900px) {
.info-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
  .profile-container img {
    width: 100px;
    height: 100px;
  }
  .profile-container{
    padding: 10px 30px 10px 30px;
  }
  .profile-container button{
    padding: 15px 30px ;
  }
  h1 {
    font-size: 20px;
  }
  h3 {
    font-size: 14px;
  }
  p {
    font-size: 10px;
  }
}
</style>