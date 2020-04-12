<template>
  <div>
    <ul class="container">
      <li class="each-cmt" v-for="(post,i) in allPosts" :key="i">
        <!-- {{post.id}} -->
        <h2>{{post.post}}</h2>
        <p>Likes {{post.like}}</p>
        <ul>
          <p>List of Comments: </p>
        <li v-for="(cmt,i) in post.comments" :key="i">{{cmt[i]}}</li>
        </ul>
        <router-link :to="{name:'posts',params:{postId:post.id}}">
          <button>View</button>
        </router-link>

        <button>Like</button>
        <button>Dislike</button>
        <button>Comment</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["allPosts", "userId"])
  },
  methods: {
    ...mapActions(["loadPosts"])
  },
  created(){
      this.loadPosts();
  }
};
</script>

<style scoped>
li{
  list-style: none;
}
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.each-cmt{
  margin: 10px 0px;
  width: 80%;
  border: solid 1px black;
  box-shadow: 5px 5px 10px #797979;
}
.each-cmt:hover{
  transform: scale(1.05);
  transition: 0.5s ease all;
}
.btn-containers{
    display: flex;
justify-content: center;
align-self: center;
background: none;
}
.btn-container button,.each-cmt button{
    background: white;
    padding: 20px;
    margin-bottom: 15px;
    border: 1px solid black;
    color: black;
}
button{
    background: white;
    padding: 20px;
    margin-bottom: 5px;
    border: 1px solid black;
    color: black;

}
button:hover{
    transform: scale(1.1);
    transition: 0.5s ease all;
}

</style>