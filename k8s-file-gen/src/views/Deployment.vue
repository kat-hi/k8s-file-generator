<template>
  <div class="text-left main">
    <h3 class="heading">Deployment Configuration</h3>
    <div class="text-right">
      <b-button @click="openService" class="button">safe and create service <b-icon class="icon" icon="arrow-right-circle"></b-icon></b-button>
    </div>
      <b-row no-gutters>
        <b-col>
                <b-card-body class="card">
                  <b-form>

                    <b-form-group label="deployment name:">
                      <b-form-input v-model="form.deploymentName" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="image name:" description="schema: registry.datexis.com/<namespace>/<imagename>:<tag>">
                      <b-form-input v-model="form.imageName" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="namespace:">
                      <b-form-input v-model="form.namespace" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="container port:">
                      <b-form-input v-model="form.containerPort" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="container name:">
                      <b-form-input v-model="form.containerName" required></b-form-input>
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

  export default {
    name: 'Deployment',
    components: { YamlContainer, JsonContainer },

      data() {
        return {
          form: {
            imageName: '',
            deploymentName: '',
            containerName: '',
            namespace: '',
            containerPort: '',
            cpuRequest: ''
          },
           options: ['', 'restriction to beuth network', 'cors-allow-origin'],
           sourceRange: '*',
         }
      },

      computed: {
        jsonfile () {
          return {
              "kind": "Deployment",
              "apiVersion": "extensions/v1beta1",
              "metadata": {
               "name": this.form.deploymentName,
               "namespace": this.form.namespace,
               "labels": {
                 "app": this.form.deploymentName
               },
              },
              "spec": {
               "replicas": 1,
               "selector": {
                 "matchLabels": {
                   "app": this.form.deploymentName
                 }
               },
               "template": {
                 "metadata": {
                   "labels": {
                     "app": this.form.deploymentName
                   }
                 },
                 "spec": {
                   "containers": [
                     {
                       "name": this.form.containerName,
                       "image": this.form.imageName,
                       "ports": [
                         {
                           "name": "client-port",
                           "containerPort": this.form.containerPort,
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
              return "your yamlfile"
           }
         },
      methods: {
        openService () {
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
  margin: 4vw 0vw 2vw 0vw;
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
