<template>
  <div class="text-left main">
    <h3 class="heading">Deployment Configuration</h3>
    <b-row>
      <b-col class="my-3">
        <DefaultButton @click="openService" class="float-right" iconname="arrow-right-circle" title="save & view service"/>
      </b-col>
    </b-row>
      <b-row no-gutters>
        <b-col>
                <b-card-body class="card">
                  <b-form>

                    <b-form-group label="deployment name:">
                      <b-form-input v-model="form.deploymentname" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="image name:" description="schema: registry.datexis.com/<namespace>/<imagename>:<tag>">
                      <b-form-input v-model="form.imagename" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="namespace:">
                      <b-form-input v-model="form.namespace" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="container port:">
                      <b-form-input v-model="form.containerport" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="container name:">
                      <b-form-input v-model="form.containername" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="choose advanced settings:" class="annotations">
                      <b-form-group label="CPU requests:">
                        <b-form-select
                          :options="[{ text: 'Choose...', value: null }, '1', '2', '3', '4', '5', '6', '7', '8']"
                          :value="null"></b-form-select>
                      </b-form-group>

                      <b-form-group label="CPU limits:">
                        <b-form-select
                          :options="[{ text: 'Choose...', value: null }, '1', '2', '3', '4', '5', '6', '7', '8']"
                          :value="null"></b-form-select>
                      </b-form-group>

                      <b-form-group id="input-group-5" label="memory requests:" label-for="input-5">
                        <b-form-select
                          :options="[{ text: 'Choose...', value: null }, '2', '4', '8', '16', '32', '64', '128', '256']"
                          :value="null"
                        ></b-form-select>
                      </b-form-group>

                      <b-form-group label="memory limits:">
                        <b-form-select
                          :options="[{ text: 'Choose...', value: null }, '2', '4', '8', '16', '32', '64', '128', '256']"
                          :value="null"
                        ></b-form-select>
                      </b-form-group>

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
  </div>
</template>

<script>
  import YamlContainer from '@/components/YamlContainer'
  import JsonContainer from '@/components/JsonContainer'
  import DefaultButton from '@/components/DefaultButton'

  export default {
    name: 'Deployment',
    components: { YamlContainer, JsonContainer, DefaultButton },

      data() {
        return {
          form: {
            imagename: this.$store.state.imagename,
            deploymentname: this.$store.state.deploymentname,
            containername: this.$store.state.containername,
            targetPort: this.$store.state.containerport,
            namespace: this.$store.state.namespace,
            containerport: this.$store.state.containerport
          },
           options: ['', 'restriction to beuth network', 'cors-allow-origin'],
         }
      },

      computed: {
        jsonfile () {
          return {
              "kind": "Deployment",
              "apiVersion": "extensions/v1beta1",
              "metadata": {
               "name": this.form.deploymentname,
               "namespace": this.form.namespace,
               "labels": {
                 "app": this.form.deploymentname
               },
              },
              "spec": {
               "replicas": 1,
               "selector": {
                 "matchLabels": {
                   "app": this.form.deploymentname
                 }
               },
               "template": {
                 "metadata": {
                   "labels": {
                     "app": this.form.deploymentname
                   }
                 },
                 "spec": {
                   "containers": [
                     {
                       "name": this.form.containername,
                       "image": this.form.imagename,
                       "ports": [
                         {
                           "name": "client-port",
                           "containerPort": this.form.containerport,
                           "protocol": "TCP"
                         }
                       ],
                       },
                   ],
                   "imagePullSecrets": [
                     {
                       "name": "private-registry-auth"
                     }
                   ],
                   "schedulerName": "default-scheduler"
                 }
               },
              }
            }
           },
           yamlfile () {
              return this.jsonfile
           }
         },
      methods: {
        openService () {
          this.$store.commit('setAppName', this.form.deploymentname)
          this.$store.commit('setTargetPort', this.form.containerport)
          this.$store.commit('setContainerPort', this.form.containerport)
          this.$store.commit('setContainerName', this.form.containername)
          this.$store.commit('setNamespace', this.form.namespace)
          this.$store.commit('setImageName', this.form.imagename)
          this.$router.push({ name: 'Service' })
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
.main {
  padding: 0vw 3vw 0vw 3vw;
}
.card {
  margin-top: 1.88vh
}
.button {
  width: 245px;
  margin-right: 2vw
}
</style>
