<template>
  <div class="text-left main">
    <h3 class="heading">Ingress Configuration</h3>

    <div class="text-left">
      <b-button @click="openService" class="left-button"><b-icon class="left-icon" icon="arrow-left-circle"></b-icon>safe & go back</b-button>
    </div>
        <b-row no-gutters>
        <b-col>
                <b-card-body class="card">
                  <b-form>
                    <b-form-group label="custom ingress name:">
                      <b-form-input v-model="form.ingressName" required></b-form-input>
                    </b-form-group>

                    <b-form-group small label="domain:">
                      <b-form-select v-model="form.domainName" :options="domains" required></b-form-select>
                   </b-form-group>

                    <b-form-group label="subdomain:">
                      <b-form-input v-model="form.prefix" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="service name:">
                      <b-form-input v-model="form.serviceName" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="service port:">
                      <b-form-input v-model="form.servicePort" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="namespace:">
                      <b-form-input v-model="form.namespace" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="choose more annotations:" class="annotations">
                      <b-form-checkbox-group
                        v-model="selected"
                        :options="options"
                        name="flavour-2a"
                        stacked>
                      </b-form-checkbox-group>
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
    name: 'Ingress',
    components: { YamlContainer, JsonContainer },

      data() {
        return {
          form: {
            ingressName: '',
            servicePort: '',
            serviceName: '',
            domainName: '',
            prefix: '',
            namespace: '',
          },
           domains: [{ text: 'choose...', value: "" }, 'demo.datexis.com', 'app.datexis.com', 'internal.datexis.com', 'api.datexis.com'],
           options: ['enable CORS', 'restriction to beuth network', 'cors-allow-origin'],
           sourceRange: '*'
         }
      },

      computed: {
        jsonfile () {
          return {
               "kind": "Ingress",
               "apiVersion": "extensions/v1beta1",
               "metadata": {
                 "name": this.form.ingressName,
                 "namespace": this.form.namespace,
                 "annotations": {
                   "cert-manager.io/cluster-issuer": "letsencrypt",
                   "kubernetes.io/ingress.class": "nginx"
                 }
               },
               "spec": {
                 "tls": [
                   {
                     "hosts": [
                       this.form.prefix + "." + this.form.domainName
                     ],
                     "secretName": this.form.prefix + "-" + this.form.namespace + "-ingress-tls"
                   }
                 ],
                 "rules": [
                   {
                     "host": this.form.prefix + "." + this.form.domainName,
                     "http": {
                       "paths": [
                         {
                           "backend": {
                             "serviceName": this.form.serviceName,
                             "servicePort": this.form.servicePort
                           }
                         }
                       ]
                     }
                   }
                ]
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
.card {
  margin-top: 1.88vh
}
.left-icon {
  margin-right: 1vw
}
.heading {
  margin: 4vw 0vw 2vw 0vw;
}
.left-button {
  margin-bottom: 2vw
}

.main {
  padding: 0vw 3vw 0vw 3vw;
}
</style>
