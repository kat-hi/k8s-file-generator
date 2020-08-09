<template>
  <div id="app">
    <div id="nav">
      <Navigation />
      <router-view/>
    </div>
  </div>
</template>
<script>
  import Navigation from '@/components/Navigation/Navigation'

  export default {
    components: { Navigation }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', sans-serif;
  font-size: smaller;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 99vw;
}

</style>
