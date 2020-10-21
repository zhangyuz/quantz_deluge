<template>
  <v-container>
    <p>Hello QuantZ</p>
    <div>
      <highcharts :constructorType="'stockChart'" class="hc" :options="chartOptions" ref="chart">
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

export default {
  name: 'QuantZ',
  data: () => ({
    chartOptions: {
      series: [
        {
          data: [1, 2, 3, 4, 6, 3],
        },
      ],
    },
  }),
  methods: {
    get_us_wei() {
      axios.get('us_wei_item')
        .then((data) => {
          console.log(data.data.items);
          let df = new dataForge.DataFrame(data.data.items);
          df = df.parseDates('when');
          const seriesWhen = df.getSeries('WEI').toArray();
          console.log(df.getSeries('when').toArray());
          const chartOptions = {
            series: [
              {
                data: seriesWhen,
              },
            ],
          };
          this.chartOptions = chartOptions;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.log('mounted');
    this.get_us_wei();
  },
};
</script>
