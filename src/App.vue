<template>
  <div id="app">
    <input v-on:click="refreshMessage" />
  </div>
</template>

<script>
module.exports = {
  data: function() {
    return {
      api_key: '67A6161D-F28A-4CAC-944D-8D392FEEC26B'
    }
  },
  methods: {
    refreshMessage() {
      this.$http.get('v1/exchangerate/BTC?apikey=67A6161D-F28A-4CAC-944D-8D392FEEC26B').then((response) => {
        console.log('test HTTP',response);
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
