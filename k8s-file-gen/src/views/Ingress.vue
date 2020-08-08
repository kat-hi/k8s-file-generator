<template>
  <div>
    <b-card class="card text-left">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-body title="ingress configuration">
            <b-form>
              <b-form-group id="input-group-1" label="custom ingress name:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  v-model="form.ingressName"
                  required
                  placeholder="choose a custom ingress name">
                </b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" small label="domain:" label-for="input-2">
                <b-form-select
                 id="input-2"
                 v-model="form.domainName"
                 :options="domains"
                 required>
               </b-form-select>
             </b-form-group>

              <b-form-group id="input-group-1" label="subdomain:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  v-model="form.prefix"
                  required
                  placeholder="what's your subdomain name?">
                </b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="service name:"
                label-for="input-3">
                <b-form-input
                  id="input-3"
                  v-model="form.serviceName"
                  required
                  placeholder="what's your service name?">
                </b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-4"
                label="service port:"
                label-for="input-4">
                <b-form-input
                  id="input-4"
                  v-model="form.servicePort"
                  required
                  placeholder="what's your service port?">
                </b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-4"
                label="namespace:"
                label-for="input-4">
                <b-form-input
                  id="input-4"
                  v-model="form.namespace"
                  required
                  placeholder="where to deploy?">
                </b-form-input>
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
        <b-col md="6">
          <b-card-body class="body2">
            <b-card-text>
              <b-card header="json file" class="header" v-b-toggle.accordion-1>
                  <b-collapse id="accordion-1" visible accordion="my-accordion" role="tab">
                    <pre>{{ jsonfile }}</pre>
                  </b-collapse>
              </b-card>
              <b-card header="yaml file" v-b-toggle.accordion-2>
                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                  <pre>{{ yamlfile }}</pre>
                </b-collapse>
              </b-card>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'Ingress',
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
           domains: [{ text: 'Select One', value: "" }, 'demo.datexis.com', 'apps.datexis.com', 'internal.datexis.com', 'api.datexis.com'],
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
                     "secretName": this.form.prefix + "-" + this.form.namespace + "ingress-tls"
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

      }
    }
</script>

<style>
.card {
  margin: 2vw 4vw 2vw 4vw;
}
.select {
  font-size: 10px
}
#input-group-1 {
  margin-top: 2vw;
}
.header {
  margin-top: 5vw
}
.body2 {
  height: 75%
}
.annotations {
  margin-top: 2vw
}

</style>
