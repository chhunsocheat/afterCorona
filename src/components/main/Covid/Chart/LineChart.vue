<script>
import { Line } from "vue-chartjs";
import axios from "axios"
import moment from "moment"
export default {
  extends: Line,
  props:[
      'country'
  ],
   data() {
    return {
      daysSpain:null,
      numberOfDaysSpain:null,
        days:null,
        date:null,
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

      const dataCountry = await axios.get(`https://api.covid19api.com/total/country/${this.country.toLowerCase()}/status/confirmed`);
      const dataSpain = await axios.get(`https://api.covid19api.com/total/country/United States of America/status/confirmed`);

     console.log(dataCountry.data);
     let dateSpain=[]
     let numberOfDaysSpain=[]
     let date=[]
     let numberOfDays=[]
      let allDaysData=dataCountry.data.forEach(day=>{
          console.log(day.Cases);
          date.push(moment(day.Date).format("MM/DD"));
          numberOfDays.push(day.Cases)
      })
      dataSpain.data.forEach(day=>{
          console.log(day.Cases);
          dateSpain.push(moment(day.Date).format("MM/DD"));
          numberOfDaysSpain.push(day.Cases)
      })
      this.daysSpain=numberOfDaysSpain;
      console.log("Spain",this.daysSpain);
      
      this.numberOfDaysSpain=numberOfDaysSpain;
      this.days=numberOfDays;
      console.log("Other",this.days);

      this.date=date;
    
    },
  },
  mounted() {
      this.loadData().then(()=>{

          this.renderChart(
            {
              labels: this.date,
              datasets: [
                {
                  label: `Number of Case ${this.country}`,
                  data: this.days,
                  backgroundColor: "transparent",
                  borderColor: "rgba(1, 116, 188, 0.50)",
                  pointBackgroundColor: "black"
                },
                 {
                  label: `Number of Case US`,
                  data: this.daysSpain,
                  backgroundColor: "transparent",
                  borderColor: "brown",
                  pointBackgroundColor: "red"
                }
              ]
            },
            {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                
              }
            }
          );
      })
  }
};
</script>