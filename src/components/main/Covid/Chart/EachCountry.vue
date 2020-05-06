<template>
  <div id="app">
    <div style="margin-top:20vh;"></div>
    <CoolSelect v-model="selected" :items="items" />
    <h1>Over View of {{country}} vs US</h1>
    <LineChart :country="country" />
  </div>
</template>

<script>
import LineChart from "./LineChart";
import axios from "axios";
import { CoolSelect } from "vue-cool-select";
export default {
  name: "App",
  components: {
    LineChart
    ,CoolSelect 
  },

  data() {
    return {
      // simple example of items
      items: ["Item 1", "Item 2", "Item 3"],
      // there will be a selected item
      selected: null,
      country: this.$route.params.countryName,
      days: null,
      chartData: {
        Books: 24,
        Magazine: 30,
        Newspapers: 10
      }
    };
  },
  methods: {
    async loadData() {
      //console.log(this.getCountryName("Cambodia"));

      const data = await axios.get(
        `https://api.covid19api.com/${this.country.toLowerCase()}/spain/status/confirmed`
      );
      console.log(data.data);

      this.days = data.data;

      console.log("All Countries");

      //setTimeout(loadData, 1000);
    }
  },
  created() {
    this.loadData();
    console.log(this.$route.params.countryName);
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
