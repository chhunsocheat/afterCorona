<template>
  <h1>Covid 19 Global Case: {{data}} </h1>
</template>

<script>
import axios from "axios"
export default {
data(){
    return {
        data:null
    }
},
methods:{
    async loadData(){
        const data = await axios.get("https://api.covid19api.com/summary")
        //console.log(data.data.Global.TotalConfirmed);
        const allCase=data.data.Global.TotalConfirmed;
        this.data=allCase;
        
    //setTimeout(loadData, 1000);
    },
},
created(){
this.loadData();
},
// watch:{
// data:this.loadData()
// },
mounted: function () {
  window.setInterval(() => {
    this.loadData()
  }, 30000)
}
}
</script>

<style>

</style>