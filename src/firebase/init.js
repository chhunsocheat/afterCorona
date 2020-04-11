import firebase from "firebase"
import firestore from "firebase/firestore"
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyChW7kqxK8WSkU9cr3CS42Xa1fxzFbp_hY",
    authDomain: "food-vue-695a7.firebaseapp.com",
    databaseURL: "https://food-vue-695a7.firebaseio.com",
    projectId: "food-vue-695a7",
    storageBucket: "food-vue-695a7.appspot.com",
    messagingSenderId: "1084101415483",
    appId: "1:1084101415483:web:b0619a61d8ad1da3f0021e",
    measurementId: "G-YD7KWKS8EK"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig)

  //export firestore database
  export default firebaseApp.firestore()