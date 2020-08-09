<template>
  <b-card-body>
    <b-card-text>
      <b-card header="json" v-b-toggle.accordion-2>
        <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
          <pre>{{ jsonfile }}</pre>
        </b-collapse>
      </b-card>
    </b-card-text>
  </b-card-body>
</template>

<script>
  export default {
    name: 'JsonContainer',

    props: ['jsonfile']
  }
</script>

<style scoped>

</style>
