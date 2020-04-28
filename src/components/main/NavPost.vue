<template>
  <div class="main-container">
      <div @click="activeTab=2" class="status-post">
      <router-link  :class="{active:activeTab===2}" class="router-link" :to="{name:'main'}">
        <i class="fas fa-poll-h"></i>
        <h3>Status Post</h3>
      </router-link>
      </div>
      <div @click="activeTab=1" class="image-post">
      <router-link @click="activeTab=1" :class="{active:activeTab===1}" class="router-link" :to="{name:'mainimage'}">
        <i class="fas fa-image"></i>
        <h3>Image Post</h3>
      </router-link>
      </div>
    </div>
</template>

<script>
export default {
data(){
    return{
         activeTab:1,
    }
}
}
</script>

<style scoped>
.active {
  background: #00aaff;
  border: none;
  font-weight: 700;
}

.main-container {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  background: #aee3fd;
    grid-template-areas: ". .";
}
.fas {
  margin-right: 10px;
}
.status-post .router-link,.image-post .router-link{
    display: flex;
    justify-content: center;
}
.status-post:hover{
  background: #00aaff;
  transition: ease all 0.5s;
}
.image-post:hover{
  background: #00aaff;
  transition: ease all 0.5s;
}
.router-link {
  padding: 10px;
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
}

</style>