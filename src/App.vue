<template>
  <v-app>
    <v-main>
      <QuantZ/>
    </v-main>
  </v-app>
</template>

<script>
import QuantZ from './components/QuantZ.vue';

export default {
  name: 'App',

  components: {
    QuantZ,
  },

  data: () => ({
    //
  }),
};
</script>
