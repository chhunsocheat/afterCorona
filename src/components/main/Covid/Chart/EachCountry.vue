<template>
  <div id="app">
      <div style="margin-top:20vh;"></div>
   <h1>Over View of Spain </h1>
    <LineChart/>
  </div>
</template>

<script>

import LineChart from "./LineChart"
import axios from "axios"
export default {
  name: "App",
  components: {
    
    LineChart
  },
  
  data() {
    return {
        days:null,
      chartData: {
        Books: 24,
        Magazine: 30,
        Newspapers: 10
      }
    };
  },
  methods:{
        async loadData() {
      //console.log(this.getCountryName("Cambodia"));

      const data = await axios.get('https://api.covid19api.com/country/spain/status/confirmed');
      console.log(data.data);
      
      this.days=data.data

      console.log("All Countries");

      //setTimeout(loadData, 1000);
    },
  },
  created(){
      this.loadData();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 80vh;
}
</style>
