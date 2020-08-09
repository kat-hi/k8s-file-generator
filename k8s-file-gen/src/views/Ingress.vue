<template>
  <div class="text-left main">
    <h3 class="heading">Ingress Configuration</h3>
      <b-row>
        <b-col class="my-3">
          <DefaultButton @click="openService" class="float-left" iconname="arrow-left-circle" title="safe & go back"/>
        </b-col>
        <b-col class="my-3">
          <DefaultButton @click="openAll" class="float-right" iconname="arrow-right-circle" title="safe & view all files"/>
        </b-col>
      </b-row>
        <b-row no-gutters>
        <b-col>
                <b-card-body class="card">
                  <b-form>
                    <b-form-group label="custom ingress name:">
                      <b-form-input v-model="form.ingressname" required></b-form-input>
                    </b-form-group>

                    <b-form-group small label="domain:">
                      <b-form-select v-model="form.domainname" :options="domains" required></b-form-select>
                   </b-form-group>

                    <b-form-group label="subdomain:">
                      <b-form-input v-model="form.subdomain" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="service name:">
                      <b-form-input v-model="form.servicename" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="service port:">
                      <b-form-input v-model="form.serviceport" required></b-form-input>
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
  import DefaultButton from '@/components/DefaultButton'

  export default {
    name: 'Ingress',
    components: { YamlContainer, JsonContainer, DefaultButton },

      data() {
        return {
          form: {
            ingressname: this.$store.state.ingressname,
            serviceport: this.$store.state.serviceport,
            servicename: this.$store.state.servicename,
            domainname: this.$store.state.domainname,
            subdomain: this.$store.state.subdomain,
            namespace: this.$store.state.namespace,
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
                 "name": this.form.ingressname,
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
                       this.form.subdomain + "." + this.form.domainname
                     ],
                     "secretName": this.form.subdomain + "-" + this.form.namespace + "-ingress-tls"
                   }
                 ],
                 "rules": [
                   {
                     "host": this.form.subdomain + "." + this.form.domainname,
                     "http": {
                       "paths": [
                         {
                           "backend": {
                             "serviceName": this.form.servicename,
                             "servicePort": this.form.serviceport
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
       commitChanges () {
         this.$store.commit('setIngressName', this.form.ingressname)
         this.$store.commit('setDomainName', this.form.domainname)
         this.$store.commit('setSubdomain', this.form.subdomain)
         this.$store.commit('setNamespace', this.form.namespace)
         this.$store.commit('setServiceName', this.form.servicename)
         this.$store.commit('setServicePort', this.form.serviceport)
       },
       openService () {
         this.commitChanges()
         this.$router.push({ name: 'Service' })
       },
       viewAll () {
         this.commitChanges()
         this.$router.push({ name: 'Overview' })
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
.heading {
  margin: 4vw 0vw 1vw 0vw;
}
.main {
  padding: 0vw 3vw 0vw 3vw;
}
</style>
