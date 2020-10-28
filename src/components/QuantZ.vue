<template>
  <v-container>
    <div>
      <highcharts :constructorType="'stockChart'" class="hc"
       :options="joblessChartOptions" ref="jobless">
      </highcharts>
      <highcharts :constructorType="'stockChart'" class="hc"
       :options="weiChartOptions" ref="wei">
      </highcharts>
    </div>
  </v-container>
</template>

<script>

const axios = require('axios');
const dataForge = require('data-forge');

axios.defaults.baseURL = 'http://127.0.0.1:5000';

/*
function columnToList(jsonStr, column) {
  console.log(jsonStr, column);
}
*/

const weiSeriesData = {
  name: 'WEI',
  data: [],
  marker: {
    enabled: true,
    radius: 3,
  },
};

const initialJoblessClaimSeriesData = {
  name: 'US Initial Jobless Claim',
  data: [],
  marker: {
    enabled: true,
    radius: 3,
  },
};

export default {
  name: 'QuantZ',
  data: () => ({
    joblessChartOptions: {
      chart: {
        type: 'spline',
      },
      series: [
        initialJoblessClaimSeriesData,
      ],
      tooltip: {
        enabled: true,
        followPointer: true,
        split: false,
        shared: true,
        dateTimeLabelFormats: {
          millisecond: '%Y-%m-%d',
        },
      },
      navigator: {
        enabled: true,
      },
      stockTools: {
        gui: {
          enabled: true,
        },
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        crosshair: {
          enabled: true,
        },
      },
      yAxis: {
        crosshair: {
          enabled: true,
        },
      },
    },
    weiChartOptions: {
      chart: {
        type: 'spline',
      },
      series: [
        weiSeriesData,
      ],
      tooltip: {
        enabled: true,
        followPointer: true,
        split: false,
        shared: true,
        dateTimeLabelFormats: {
          millisecond: '%Y-%m-%d',
        },
      },
      navigator: {
        enabled: true,
      },
      stockTools: {
        gui: {
          enabled: false,
        },
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        crosshair: {
          enabled: true,
        },
      },
      yAxis: {
        crosshair: {
          enabled: true,
        },
      },
    },
  }),
  methods: {
    get_us_wei() {
      axios.get('us_wei_item?max_results=600&sort=when&where={"when":%20{"$gte":1262275200000}}')
        .then((data) => {
          // console.log(data.data.items);
          const df = new dataForge.DataFrame(data.data.items);
          // console.log(df.getSeries('when').toArray());
          // console.log(df.getSeries('WEI').toArray());
          const weis = df.toArray();
          let i = 0;
          for (i; i < weis.length; i += 1) {
            weiSeriesData.data.push([weis[i].when, weis[i].WEI]);
          }
          /*
          const joblessChartOptions = {
            series: [{
              data: dataWei,
            },
            ],
          };
          this.joblessChartOptions = chartOptions;
          */
          console.log(weiSeriesData.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_us_initial_jobless_claim() {
      axios.get('/us_jobless_initial_claim_item?max_results=600&sort=when&where={"when":%20{"$gte":1262275200000}}')
        .then((data) => {
          console.log(data.data.items);
          const df = new dataForge.DataFrame(data.data.items);
          const ijcs = df.toArray();
          console.log(ijcs[0]);
          let i = 0;
          for (i; i < ijcs.length; i += 1) {
            initialJoblessClaimSeriesData.data.push([ijcs[i].when, ijcs[i].initial_jobless]);
          }
          console.log(initialJoblessClaimSeriesData.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    console.log('mounted');
    this.get_us_wei();
    this.get_us_initial_jobless_claim();
  },
};
</script>

<style>
.hc {
  height: 300px;
  width: 100%;
}
</style>
