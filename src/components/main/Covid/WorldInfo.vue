<template>
  <div>
    <div style="margin-top:100px;"></div>

    

    <!-- <span class="flag-icon flag-icon-kh"></span> -->
    <!-- <h1>Covid 19 Global newConfirmed: {{newConfirmed}}</h1> -->
    <!-- <h1>Covid 19 Global newDeaths: {{newDeaths}}</h1> -->
    <!-- <span style="width=20px;height=20px;" class="flag-icon flag-icon-kh"></span> -->
    <!-- <h1>Covid 19 Global newRecovered: {{newRecovered}}</h1> -->
    <div class="info-container">
      <h3>Global Total Confirmed:</h3>
      <h2>
        {{totalConfirmed}}
        <i class="fas fa-viruses"></i>
      </h2>

      <h3>Global Total Deaths:</h3>
      <h2 style="color:#D6001C;">
        {{totalDeaths}}
        <i class="fas fa-skull-crossbones"></i>
      </h2>
      <h3>Global Total Recovered:</h3>
      <h2 style="color:#8ACA2B;">
        {{totalRecovered}}
        <i class="fas fa-shield-virus"></i>
      </h2>
    </div>
    <h1 style="margin-bottom:20px;">List of Countries: </h1>
<div ref="country" class="countries">
      
    </div>
    <div>
  <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
    <b-dropdown-item>First Action</b-dropdown-item>
    <b-dropdown-item>Second Action</b-dropdown-item>
    <b-dropdown-item>Third Action</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item active>Active action</b-dropdown-item>
    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
  </b-dropdown>
</div>
    <div style="margin-bottom:100px;"></div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "flag-icon-css/css/flag-icon.css";
import { isoCountries, getCountryName } from "./countriesCodes";
import axios from "axios";
export default {
  data() {
    return {
      newConfirmed: null,
      newDeaths: null,
      newRecovered: null,
      totalConfirmed: null,
      totalDeaths: null,
      totalRecovered: null,
      allCountries: null
    };
  },
  methods: {
    getCountryCode(countryName) {
      if (isoCountries.hasOwnProperty(countryName)) {
        return isoCountries[countryName];
      } else {
        return countryName;
      }
    },
    async loadData() {
      //console.log(this.getCountryName("Cambodia"));

      const data = await axios.get("https://api.covid19api.com/summary");
      console.log(data.data);
      //   const global = Object.entries(data.data.Global);
      // let globalArray=[]
      //   for (let [key, value] of global) {
      //     console.log(`${key}: ${value}`);

      //   }
      this.newConfirmed = data.data.Global.NewConfirmed;
      this.newDeaths = data.data.Global.NewDeaths;
      this.newRecovered = data.data.Global.NewRecovered;
      this.totalConfirmed = data.data.Global.TotalConfirmed;
      this.totalDeaths = data.data.Global.TotalDeaths;
      this.totalRecovered = data.data.Global.TotalRecovered;

      console.log("All Countries", this.allCountries);

      //setTimeout(loadData, 1000);
    },
    async loadCountries() {
      //console.log(this.getCountryName("Cambodia"));

      const data = await axios.get("https://api.covid19api.com/summary");

      this.allCountries = data.data.Countries.slice(20,40);
      console.log("All Countries", this.allCountries);

      //setTimeout(loadData, 1000);
    },
    injectCountry() {
      const countrySelected = this.$refs.country;
      this.allCountries.forEach(country => {
        let countryCode = country.CountryCode;
        //console.log(this.$refs.country);
        countrySelected.innerHTML += `           
            <div class="each-country">
         <span style="width=20px;height=20px;" class="flag-icon flag-icon-${countryCode.toLowerCase()}"></span>
        <h3>${country.Country}</h3>
        <div class="figure">
          <div>
            <p>Confirm Cases</p>
             <h4>${country.TotalConfirmed}</h4>
          </div>
          <div>
            <p>Total Recovered</p>
            <h4>${country.TotalRecovered}</h4>
          </div>
          <div>
            <p>Active Case</p>
            <h4>${country.TotalConfirmed-country.TotalRecovered}</h4>
          </div>
          <div>
            <p>Confirm Death</p>
             <h4>${country.TotalDeaths}</h4>
          </div>
        </div>
      </div>
            `;
      });
    }
  },
  created() {
    this.loadData();
  },
    mounted() {
      this.loadCountries().then(()=>{
          this.injectCountry();

      });
    }
};
</script>

<style >
.figure div{
    margin:0px 10px 0px 10px;
}
.info-container h3,.info-container h2{
 margin-bottom: 10px;
}
.countries {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 15px;
}
.each-country {
    box-shadow: 5px 5px 10px #79797957;
padding: 20px 50px 20px 50px;
border-radius: 5px;
  border: transparent solid 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}
.each-country:hover {
  border: black 1px solid;
  cursor: pointer;
}
.figure {
  display: flex;
}
</style>