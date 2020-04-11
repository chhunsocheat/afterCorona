<template>
  <div>
      <h1>Create Your Post here</h1>
      <form action="">
      <textarea name="" id="" v-model="comment"></textarea>
      <p v-if="feedback">{{feedback}}</p>
      <button @click="submitPost">Submit</button>
      </form>
  </div>
</template>

<script>
import db from "../../firebase/init"
import {mappGetters, mapGetters} from "vuex"
export default {
data(){
    return { 
        comment:null,
        feedback:null
    }
},
computed:{
...mapGetters([
    'userId'
])
},
methods:{
    submitPost(){
        if(this.comment){
        db.collection("Comment")
        .add({
            comment:this.comment
        })
        .then(()=>{
            this.$router.push({name:'main',params:{userId:this.userId}})
        })
    }else{
        this.feedback="Please Enter a post before submitting"
    }
    }
}
}
</script>

<style>
input{
   padding: 300px;
}
form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
button{
    background: white;
    padding: 20px;
    margin-top: 20px;
    border: 1px solid black;
    color: black;

}
button:hover{
    transform: scale(1.1);
    transition: 0.5s ease all;
}
</style>