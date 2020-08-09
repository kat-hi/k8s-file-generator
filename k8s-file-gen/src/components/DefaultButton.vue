<template>
  <div>
    <b-button class="buttonstyle" v-b-tooltip.hover :title="title" @click="$emit('click')">
      <b-icon :icon="iconname" aria-hidden="true"></b-icon>
    </b-button>
  </div>
</template>

<script>

  export default {
    name: 'DefaultButton',
    props: ['iconname', 'title']
  }

</script>

<style scoped>
  .buttonstyle {
    width: 50px;
    margin-right: 1vw
  }
</style>
