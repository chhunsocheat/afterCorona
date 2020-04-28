<template>
  <ul class="container">
    <li @click="activeTab=1" :class="{active:activeTab===1}">
      <router-link class="router-link" :to="{name:'main'}">
        <div class="inner-link">
          <i class="fas fa-home"></i>
          Main
        </div>
      </router-link>
    </li>
    <li @click="activeTab=2" :class="{active:activeTab===2}">
      <router-link class="router-link" :to="{name:'main'}">
        <div class="inner-link">
          <i class="fas fa-poll-h"></i>
          Status
        </div>
      </router-link>
    </li>
    <li @click="activeTab=3" :class="{active:activeTab===3}">
      <router-link class="router-link" :to="{name:'mainimage'}">
        <div class="inner-link">
          <i class="fas fa-images"></i>Image
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 2
    };
  }
};
</script>

<style scoped>
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
@media only screen and (max-width: 640px) {
  
  
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
    margin-left: 7vw;
  }
}
</style>