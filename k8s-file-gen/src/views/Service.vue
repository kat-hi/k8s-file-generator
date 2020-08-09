<template>
  <div class="text-left main">
    <h3 class="heading">Service Configuration</h3>
    <b-row>
      <b-col class="my-3">
        <DefaultButton @click="openDeployment" class="float-left" iconname="arrow-left-circle" title="safe & go back"/>
      </b-col>
      <b-col class="my-3">
        <DefaultButton @click="openIngress" class="float-right" iconname="arrow-right-circle" title="safe & view ingress"/>
      </b-col>
    </b-row>
      <b-row no-gutters>
        <b-col>
                <b-card-body class="card">
                  <b-form>
                    <b-form-group label="custom service name:">
                      <b-form-input v-model="form.serviceName" required></b-form-input>
                    </b-form-group>

                    <b-form-group small label="service port">
                      <b-form-input v-model="form.servicePort" required></b-form-input>
                   </b-form-group>

                    <b-form-group label="namespace:">
                      <b-form-input v-model="form.namespace" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="deployment name">
                      <b-form-input v-model="form.deploymentName" required></b-form-input>
                    </b-form-group>
                  </b-form>
                </b-card-body>
        </b-col>
        <b-col>
          <JsonContainer :jsonfile="jsonfile"/>
        </b-col>
        <b-col>
          <YamlContainer :yamlfile="yamlfile"/>
        </b-col>
      </b-row>
      <b-row>
        <div class="text-left">
        </div>
        <div class="text-right">
        </div>
      </b-row>
  </div>
</template>

<script>
  import YamlContainer from '@/components/YamlContainer'
  import JsonContainer from '@/components/JsonContainer'
  import DefaultButton from '@/components/DefaultButton'

  export default {
    name: 'Service',
    components: { YamlContainer, JsonContainer, DefaultButton },

      data() {
        return {
          form: {
            servicePort: '',
            serviceName: '',
            namespace: '',
            deploymentName: ''
          },
         }
      },

      computed: {
        jsonfile () {
          return {
              "kind": "Service",
              "apiVersion": "v1",
              "metadata": {
                "name": this.form.serviceName,
                "namespace": this.form.namespace,
              },
              "spec": {
                "ports": [
                  {
                    "protocol": "TCP",
                    "port": this.form.servicePort                  }
                ],
                "selector": {
                  "app": this.form.deploymentName
                },
              }
            }
           },
           yamlfile () {
              return "your yamlfile"
           }
         },
     methods: {
       openIngress () {
         this.$router.push({ name: 'Ingress' })
       },
       openDeployment () {
         this.$router.push({ name: 'Deployment' })
       }
     }
    }
</script>

<style scoped>
.row, .col {
  margin: 0;
  padding: 0;
}
.heading {
  margin: 4vw 0vw 1vw 0vw;
}
.card {
  margin-top: 1.88vh
}
.main {
  padding: 0vw 3vw 0vw 3vw;
}
</style>
