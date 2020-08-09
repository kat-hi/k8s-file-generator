import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deploymentname: "",
    imagename: "",
    containername: "",
    containerport: "",
    targetport: "",
    serviceport: "",
    namespace: "",
    servicename: "",
    ingressname: "",
    domainname: "",
    subdomain: ""
  },
  mutations: {
    setAppName (state, name) { state.deploymentname = name },
    setTargetPort (state, port) { state.targetport = port },
    setServicePort (state, port) { state.serviceport = port },
    setServiceName (state, name) { state.servicename = name },
    setNamespace (state, namespace) { state.namespace = namespace },
    setIngressName (state, ingressname) { state.ingressname = ingressname },
    setContainerPort (state, port) { state.containerport = port },
    setContainerName (state, name) { state.containername = name },
    setImageName (state, name) { state.imagename = name},
    setDomainName (state, name) { state.domainname = name},
    setSubdomain (state, name) { state.subdomain = name}
  },
  getters: {
    ingressname (state) { return state.ingressname },
    targetPort (state) { return state.targetport },
    deploymentName (state) { return state.deploymentname },
    namespace (state) { return state.namespace }
  },
  actions: {
  },
  modules: {
  }
})
