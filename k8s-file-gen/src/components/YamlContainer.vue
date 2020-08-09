<template>
  <b-card-body>
    <b-card-text>
      <b-card header="yaml" v-b-toggle.accordion-2>
        <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
          <pre>{{ yamlfile }}</pre>
        </b-collapse>
      </b-card>
    </b-card-text>
  </b-card-body>
</template>

<script>
  export default {
    name: 'YamlContainer',
    
    props: ['yamlfile']
  }
</script>

<style scoped>

</style>
