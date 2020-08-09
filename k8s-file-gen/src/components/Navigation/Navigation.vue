<template>
  <div>
      <b-navbar toggleable="xl" type="dark" variant="dark">
        <b-navbar-brand @click="goHome" class="brand">K8s-Files-Generator</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <NavigationElement route="Home" title="Home" />
            <NavigationElement route="Notes" title="Notes" />
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
import NavigationElement from '@/components/Navigation/NavigationElement'
export default {
  name: 'Navigation',
  components: {
    NavigationElement
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'Home' })
    },
  }
}
</script>

<style scoped lang="scss">
  img{
    width: 6rem;
    max-height: 5em;
    margin-right: 1vw;
    margin-left: 1vw;
  }
  .brand {
    margin-right: 2vw
  }
</style>
