<template>
  <b-card-body>
    <b-card-text>
      <b-card>
          <b-button class="btn btn-link 1" aria-expanded="true" v-b-toggle.accordion-1>
            <b-icon class="mr-2" icon="chevron-double-down"></b-icon>
            json
          </b-button>
            <b-collapse id="accordion-1" v-b-visible accordion="my-accordion1" role="tabpanel">
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
