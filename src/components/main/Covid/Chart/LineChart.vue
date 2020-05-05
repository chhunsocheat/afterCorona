<script>
import { Line } from "vue-chartjs";
import axios from "axios"
import moment from "moment"
export default {
  extends: Line,
   data() {
    return {
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

      const data = await axios.get('https://api.covid19api.com/country/spain/status/confirmed');
     console.log(data);
     let date=[]
     let numberOfDays=[]
      let allDaysData=data.data.forEach(day=>{
          console.log(day.Cases);
          date.push(moment(day.Date).format("MM/DD"));
          numberOfDays.push(day.Cases)
      })
      this.days=numberOfDays;
      this.date=date;
      console.log(date);
      
     console.log(this.days);

      //console.log("All Countries");

      //setTimeout(loadData, 1000);
    },
  },
  mounted() {
      this.loadData().then(()=>{

          this.renderChart(
            {
              labels: this.date,
              datasets: [
                {
                  label: "Number of Case Spain",
                  data: this.days,
                  backgroundColor: "transparent",
                  borderColor: "rgba(1, 116, 188, 0.50)",
                  pointBackgroundColor: "black"
                }
              ]
            },
            {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: "My Data"
              }
            }
          );
      })
  }
};
</script>