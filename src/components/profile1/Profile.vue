<template>
<div>
    <div class="nav-top"></div>
  <div class="container">
    <div class="profile-container">
      <div class="profile">
        <img :src="img" alt />

        <div class="upload" style="
          width: 20px;">
          <input
            @change="uploadProfile($event)"
            type="file"
            name="file-input"
            id="file-input"
            class="file-input__input"
          />
          <label for="file-input">
            <i class="fas fa-plus" style="
          cursor: pointer;"></i>
          </label>
        </div>
      </div>
      <p v-if="progress">uploading {{progress}}%...</p>
      <button class="btn-upload" @click="uploadProfilePic">Upload</button>
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

      <button class="btn-signout" @click="signOut">Sign Out</button>
    </div>
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
      file: null,
      progress: null
    };
  },
  methods: {
    click() {
      const auth = this.$store.state;
      console.log("auth store", auth);
    },
    uploadProfile(event) {
      this.file = event.target.files[0];
      console.log("profile image",this.file);
      
    },
    uploadProfilePic() {
      let img = this.img;
      let storageRef = firebase.storage().ref(`photo/${this.file.name}`);
      let uploadTask = storageRef.put(this.file);
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
             db.collection("Users")
              .doc(this.getUserDocId)
              .update({
                imgUrl: downloadURL
              });

            this.img = downloadURL;
            console.log("img url new", this.img);
            const auth = this.$store.state.auth.userInfo.imgUrl;
            this.$store.commit("auth/changeUrl", this.img);
            this.progress = null;
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
.nav-top{
  margin-top: 80px;
}
.fa-plus {
  font-size: 20px;
  padding: 0;
  margin: 0;
}
.upload {
  cursor: pointer;
  position: relative;
  top: -22%;
  right: -70%;
  background: #56baed;
  border-radius: 50%;
  padding: 20px;
}
.btn-signout {
  background-color: rgb(255, 94, 94);
  -webkit-box-shadow: 0 5px 20px 0 rgba(255, 94, 94, 0.658);
  box-shadow: 0 5px 20px 0 rgba(255, 94, 94, 0.774);
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
.profile {
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
.btn-upload {
  padding: 13px 35px;
}
button:hover {
  transform: scale(1.1);
  transition: 0.5s ease all;
}
h1 {
  margin-bottom: 30px;
  border-bottom: #56baed solid 2px;
  font-size: 40px;
  letter-spacing: 3px;
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

  .profile-container {
    padding: 10px 30px 10px 30px;
  }
  .profile-container button {
    padding: 15px 30px;
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
  .fa-plus {
    font-size: 10px;
    padding: 0;
    margin: 0;
  }
  .btn-upload {
    padding: 10px 25px;
  }
  .upload {
    cursor: pointer;
    position: relative;
    top: -30%;
    right: -65%;
    background: #56baed;
    border-radius: 50%;
    padding: 5px;
  }
  h1 {
    margin-bottom: 10px;
    border-bottom: #56baed solid 2px;
  }
  .btn-signout{
    padding: 15px 40px;
  }
}
</style>