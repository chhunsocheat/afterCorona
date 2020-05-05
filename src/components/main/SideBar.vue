<template>
  <ul class="container">
    <li class="first" @click="changeActiveClass(1)" :class="{active:getActiveClass===1}">
      <router-link class="router-link" :to="{name:'maincovid'}">
        <div class="inner-link">
          <i class="fas fa-home"></i>
          Main
        </div>
      </router-link>
    </li>
    <li @click="changeActiveClass(2)" :class="{active:getActiveClass===2}">
      <router-link class="router-link" :to="{name:'main'}">
        <div class="inner-link">
          <i class="fas fa-poll-h"></i>
          Status
        </div>
      </router-link>
    </li>
    <li @click="changeActiveClass(3)" :class="{active:getActiveClass===3}">
      <router-link class="router-link" :to="{name:'mainimage'}">
        <div class="inner-link">
          <i class="fas fa-images"></i>Image
        </div>
      </router-link>
    </li>
    <li >
      <router-link class="router-link" :to="{name:'profile'}">
        <div class="inner-link">
          <i class="fas fa-user"></i>Profile
        </div>
      </router-link>
    </li>
    <!-- <li >
      <router-link class="router-link" :to="{name:'profile'}">
        <div class="inner-link">
          <i class="fas fa-users"></i>Users
        </div>
      </router-link>
    </li> -->
  </ul>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  data() {
    return {
      activeTab: 1
    };
  },
  computed:{
    ...mapGetters('auth',[
      'getActiveClass'
    ])
  },
  methods:{
    click(){
      console.log(this.activeTab);
    },
      ...mapActions("auth",[
        'changeActiveClass'
      ])
  }
};
</script>

<style scoped>
.fas{
  margin-right: 5px;
}
.router-link {
  color: black;
  text-decoration: none;
}
.inner-link {
    padding: 20px 5vw 20px 5vw;
  
}
.active {
  background: #aee3fd;
}
.first{
    margin-top: 80px;
}
ul li:hover {
  background: #aee3fd;
  transition: 0.5s ease all;
  cursor: pointer;
}
ul {
  list-style-type: none;
  list-style: none;
}
.container {
  
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 0;
  border-right: 1px solid #aee3fd;
  height: 100vh;
}
@media only screen and (max-width: 639px) {
  
  
  .side-bar{
    display: none;
  }
}
@media only screen and (min-width: 1200px) {
  textarea {
  }
  .btn-sm-container {
    display: none;
  }
  .side-bar{
    margin-left: 4vw;
  }
}
</style>