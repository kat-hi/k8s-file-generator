<template>
  <b-card-body>
    <b-card-text>
      <b-card>
          <b-button class="btn btn-link 2" aria-expanded="true" v-b-toggle.accordion-2>
            <b-icon class="mr-2" icon="chevron-double-down"></b-icon>
            yaml
          </b-button>
            <b-collapse id="accordion-2" v-b-visible accordion="my-accordion2" role="tabpanel">
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
  .btn {
    color: white;
    width: 120px;
    margin-bottom: 2vw;
  }
  .btn:hover {
    color: white;
    text-decoration: none;
    background-color: #343a40;
  }
</style>
