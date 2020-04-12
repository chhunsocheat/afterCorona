<template>
  <div>
    <ul>
      <li class="each-cmt" v-for="(post,i) in allPosts" :key="i">
        {{post.id}}
        <p>{{post.post}}</p>
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

<style>
ul li{

    margin: 15px;
    list-style-type: none;
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
.each-cmt{
  background: rgb(172, 127, 127);
  border-radius: 10px;
 box-shadow: 2px 2px 4px #888888;
}
</style>