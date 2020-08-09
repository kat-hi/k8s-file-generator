<template>
  <div class="text-left main">
    <h3 class="heading">Service Configuration</h3>
      <b-row no-gutters>
        <b-col>
                <b-card-body class="card">
                  <b-form>
                    <b-form-group label="custom service name:">
                      <b-form-input v-model="form.serviceName" required placeholder="choose a custom service name"></b-form-input>
                    </b-form-group>

                    <b-form-group small label="service port">
                      <b-form-input v-model="form.servicePort" required placeholder="what's your service port?"></b-form-input>
                   </b-form-group>

                    <b-form-group label="namespace:">
                      <b-form-input v-model="form.namespace" required placeholder="where to deploy?"></b-form-input>
                    </b-form-group>

                    <b-form-group label="deployment name">
                      <b-form-input v-model="form.servicePort" required placeholder="what's your label selector?"></b-form-input>
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
          <b-button @click="openDeployment" class="left-button"><b-icon class="left-icon" icon="arrow-left-circle"></b-icon>safe & go back</b-button>
        </div>
        <div class="text-right">
          <b-button @click="openIngress" class="right-button">safe & create ingress <b-icon class="right-icon" icon="arrow-right-circle"></b-icon></b-button>
        </div>
      </b-row>
  </div>
</template>

<script>
  import YamlContainer from '@/components/YamlContainer'
  import JsonContainer from '@/components/JsonContainer'

  export default {
    name: 'Service',
    components: { YamlContainer, JsonContainer },

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
  margin: 4vw 0vw 2vw 0vw;
}

.right-icon {
  margin-left: 1vw
}
.left-icon {
  margin-right: 1vw
}
.right-button {
  width: 260px;
  margin-right: 2vw;
  position: absolute;
  right: 5%
}
.left-button {
  width: 260px;
  position: absolute;
  left: 5%
}

.main {
  padding: 0vw 3vw 0vw 3vw;
}
@media only screen and (max-device-width : 600px) {
  .right-button {
    width: 260px;
    margin: 2vw 0vw 2vw 0vw;
    position: relative;
    display: block
  }
  .left-button {
    width: 260px;
    position: relative;
    display: block
  }
 }
</style>
