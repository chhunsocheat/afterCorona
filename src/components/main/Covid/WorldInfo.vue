<template>
  <div>
    <div style="margin-top:100px;"></div>

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
    <h1>Your Country</h1>
    <cool-select
    class="input"
     v-model="selected" 
     :items="items" 
     placeholder="Search for your country"
     />
    <b>Country:</b>
    {{ selected || "not chosen" }}.
    <br />
    <br />
    <div v-if="selected">
      <router-link
          class="router-link"
          :to="{name:'covidcountry',params:{countryName:selectCountryObj.countryName}}"
        >
      <div class="selected-country">
        <span
          style="width=20px;height=20px;"
         :class="['flag-icon flag-icon-'+selectCountryObj.countryCode.toLowerCase()]"
        ></span>

        <h3>{{selectCountryObj.countryName}}</h3>
        <div class="figure">
          <div>
            <p>Confirm Cases</p>
            <h4>{{selectCountryObj.totalConfirmed}}</h4>
          </div>
          <div>
            <p>Total Recovered</p>
            <h4>{{selectCountryObj.totalRecovered}}</h4>
          </div>
          <div>
            <p>Active Case</p>
            <h4>{{selectCountryObj.totalConfirmed - selectCountryObj.totalRecovered}}</h4>
          </div>
          <div>
            <p>Confirm Death</p>
            <h4>{{selectCountryObj.totalDeaths}}</h4>
          </div>
        </div>
      </div>
      </router-link>
    </div>
    <h2 style="margin-bottom:20px;">Top 10 Countries:</h2>

    <div class="loader-container">
      <div v-if="loadingStatus">
        <div class="loader"></div>
        <div class="inner-loading"></div>
      </div>
    </div>
    <div ref="country" class="countries">
      <div v-for="(country,i) in allCountries" :key="i">
        <router-link
          class="router-link"
          :to="{name:'covidcountry',params:{countryName:country.Country}}"
        >
          <div class="each-country">
            <span
              style="width=20px;height=20px;"
              :class="['flag-icon flag-icon-'+country.CountryCode.toLowerCase()]"
            ></span>

            <h3>{{country.Country}}</h3>
            <div class="figure">
              <div>
                <p>Confirm Cases</p>
                <h4>{{country.TotalConfirmed}}</h4>
              </div>
              <div>
                <p>Total Recovered</p>
                <h4>{{country.TotalRecovered}}</h4>
              </div>
              <div>
                <p>Active Case</p>
                <h4>{{country.TotalConfirmed - country.TotalRecovered}}</h4>
              </div>
              <div>
                <p>Confirm Death</p>
                <h4>{{country.TotalDeaths}}</h4>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div style="margin-bottom:100px;"></div>
  </div>
</template>

<script>
import { CoolSelect } from "vue-cool-select";

import "flag-icon-css/css/flag-icon.css";
import { isoCountries, getCountryName } from "./countriesCodes";
import axios from "axios";
export default {
  components: {
    CoolSelect
  },
  data() {
    return {
      items: null,
      selected: null,
      loadingStatus: true,
      newConfirmed: null,
      newDeaths: null,
      newRecovered: null,
      totalConfirmed: null,
      totalDeaths: null,
      totalRecovered: null,
      allCountries: null,
      allCountriesSelected: null,
      countryCode: "kh",
      selectCountryObj: {
        countryCode:null,
        countryName:null,
        newConfirmed: null,
        newDeaths: null,
        newRecovered: null,
        totalConfirmed: null,
        totalDeaths: null,
        totalRecovered: null
      }
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
        let allCountriesName = [];
        let allCountries = data.data.Countries;
        this.allCountriesSelected = allCountries;
        console.log(allCountries, "All countries");
        let selectCountry = allCountries.filter(country => {
          return country.Country === this.selected;
        });
        console.log(selectCountry, "Select Country");

        //getting all the countries name
        allCountries.forEach(country => {
          allCountriesName.push(country.Country);
        });
        console.log(allCountriesName);
        //generate all auto select
        this.items = allCountriesName;
        let top10Countries = allCountries
          .sort((a, b) => {
            return b.TotalConfirmed - a.TotalConfirmed;
          })
          .slice(0, 10);

        //getting the top 10 countries
        this.allCountries = top10Countries;

        this.loadingStatus = false;
      } catch (err) {}
      //setTimeout(loadData, 1000);
    }
  },
  watch: {
    selected: function() {
      console.log("hi");

      let selectCountry = this.allCountriesSelected.filter(country => {
        return country.Country === this.selected;
      });
      console.log(selectCountry);
      this.selectCountryObj.newConfirmed = selectCountry[0].NewConfirmed;
      this.selectCountryObj.newDeaths = selectCountry[0].NewDeaths;
      this.selectCountryObj.countryName = selectCountry[0].Country;
      this.selectCountryObj.countryCode = selectCountry[0].CountryCode;

      this.selectCountryObj.newRecovered = selectCountry[0].NewRecovered;

      this.selectCountryObj.totalConfirmed = selectCountry[0].TotalConfirmed;

      this.selectCountryObj.totalDeaths = selectCountry[0].TotalDeaths;
      this.selectCountryObj.totalRecovered = selectCountry[0].TotalRecovered;
      console.log("select obj", this.selectCountryObj);
    }
  },
  created() {
    this.loadData();
    this.loadCountries();
  },
  mounted() {
    this.loadCountries().then(() => {
      // this.injectCountry();
    });
  }
};
</script>

<style >
.selected-country{
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: transparent solid 1px;
  width: 40vw;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
   box-shadow: 5px 5px 10px #79797957;
  
  border-radius: 5px;
}
.selected-country:hover{
  border: black solid 1px;

}
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
.input{
  width: 50%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
.router-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: inherit;
  display: block;
  text-decoration: none;
}
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
@media only screen and (max-width: 800px) {
.selected-country{
  width: 100%;
}
}
</style>