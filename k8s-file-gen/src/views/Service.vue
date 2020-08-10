<template>
  <div class="text-left main">
    <h3 class="heading">Service Configuration</h3>
    <b-row>
      <b-col class="my-3">
        <DefaultButton @click="openDeployment" class="float-left" iconname="arrow-left-circle" title="save & go back"/>
      </b-col>
      <b-col class="my-3">
        <DefaultButton @click="openIngress" class="float-right" iconname="arrow-right-circle" title="save & view ingress"/>
      </b-col>
    </b-row>
      <b-row no-gutters>
        <b-col>
                <b-card-body class="card">
                  <b-form>
                    <b-form-group label="custom service name:">
                      <b-form-input v-model="form.servicename" required></b-form-input>
                    </b-form-group>

                    <b-form-group small label="service port">
                      <b-form-input v-model="form.serviceport" required></b-form-input>
                   </b-form-group>

                    <b-form-group label="namespace:">
                      <b-form-input v-model="form.namespace" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="deployment name">
                      <b-form-input v-model="form.deploymentname" required></b-form-input>
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
            serviceport: this.$store.state.serviceport,
            targetport: this.$store.state.containerport,
            servicename: this.$store.state.servicename,
            namespace: this.$store.state.namespace,
            deploymentname: this.$store.state.deploymentname
          },
         }
      },

      computed: {
        jsonfile () {
          return {
              "kind": "Service",
              "apiVersion": "v1",
              "metadata": {
                "name": this.form.servicename,
                "namespace": this.form.namespace,
              },
              "spec": {
                "ports": [
                  {
                    "protocol": "TCP",
                    "port": this.form.serviceport,
                    "targetPort": this.form.targetport,
                  }
                ],
                "selector": {
                  "app": this.form.deploymentname
                },
              }
            }
           },
           yamlfile () {
              let string =
             "kind: Service\napiVersion: v1\nmetadata:\n  name: " + this.form.servicename + "\n  namespace: " + this.form.namespace + "\nspec:\n  ports:\n  - protocol: TCP\n    port: " + this.form.serviceport + "\nselector:\n    app: " + this.form.deploymentname + "\n"
             return string
           }
         },
     methods: {
       commitChanges () {
         this.$store.commit('setServiceName', this.form.servicename)
         this.$store.commit('setServicePort', this.form.serviceport)
         this.$store.commit('setContainerPort', this.form.targetPort)
         this.$store.commit('setTargetPort', this.form.targetPort)
         this.$store.commit('setNamespace', this.form.namespace)
         this.$store.commit('setAppName', this.form.deploymentname)
       },
       openIngress () {
         this.commitChanges()
         this.$router.push({ name: 'Ingress' })
       },
       openDeployment () {
         this.commitChanges()
         this.$router.push({ name: 'Deployment' })
       }
     },
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
