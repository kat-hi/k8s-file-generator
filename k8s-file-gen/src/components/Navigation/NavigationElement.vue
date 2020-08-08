<template>
  <b-nav-item class="text" :class="{ activeRoute: routeIsActive }" @click="$router.push({ name: route })">
    <span>{{ title }}</span>
  </b-nav-item>
</template>

<script>
export default {
  name: 'NavigationElement',
  props: ['title', 'route'],
  computed: {
    routeIsActive () { return this.$route.name === this.route }
  }
}
</script>

<style scoped lang="scss">
  .activeRoute {
    @apply font-weight: 500;
  }
  .text, .m-2, .text-white {
    align-self: center;
  }
</style>
