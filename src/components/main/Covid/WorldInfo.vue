<template>
  <div>
    <div style="margin-top:100px;"></div>

    <!-- <span class="flag-icon flag-icon-kh"></span> -->
    <!-- <h1>Covid 19 Global newConfirmed: {{newConfirmed}}</h1> -->
    <!-- <h1>Covid 19 Global newDeaths: {{newDeaths}}</h1> -->
    <!-- <span style="width=20px;height=20px;" class="flag-icon flag-icon-kh"></span> -->
    <!-- <h1>Covid 19 Global newRecovered: {{newRecovered}}</h1> -->

    <div class="info-container">
      <div style="height:40px;"></div>
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
    <h2 style="margin-bottom:20px;">Top 10 Countries:</h2>
    <div class="loader-container">
      <div v-if="loadingStatus">
        <div class="loader"></div>
        <div class="inner-loading"></div>
      </div>
    </div>
    <div ref="country" class="countries"></div>
    <div></div>
    <div style="margin-bottom:100px;"></div>
  </div>
</template>

<script>
import "flag-icon-css/css/flag-icon.css";
import { isoCountries, getCountryName } from "./countriesCodes";
import axios from "axios";
export default {
  data() {
    return {
      loadingStatus: true,
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
      try {
        const data = await axios.get("https://api.covid19api.com/summary");

        let allCountries = data.data.Countries;
        let top10Countries=allCountries.sort((a,b)=>{
          return b.TotalConfirmed-a.TotalConfirmed;
        }).slice(0,10)
        this.allCountries=top10Countries;
        console.log("All Countries", top10Countries);
        this.loadingStatus = false;
      } catch (err) {}
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
            <h4>${country.TotalConfirmed - country.TotalRecovered}</h4>
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
    this.loadCountries().then(() => {
      this.injectCountry();
    });
  }
};
</script>

<style >
.figure div {
  margin: 0px 10px 0px 10px;
}
.info-container h3,
.info-container h2 {
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
  flex-direction: column;
}
.figure * {
  margin: 10px;
}
</style>
<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
}
.loader {
  display: flex;
  justify-content: center;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 60px;
  height: 60px;
  animation: spin 0.5s linear infinite; /* Safari */
  animation: spin 0.5s linear infinite;
  margin-top: 200px;
}
.inner-loading {
  position: relative;
  height: 100vh;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>