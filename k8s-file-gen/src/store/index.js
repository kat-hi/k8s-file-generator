import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appname: "",
    serviceport: "",
    servicename: "",
    namespace: ""
  },
  mutations: {
    setAppName (state, name) { state.appname = name },
    setServicePort (state, port) { state.serviceport = port },
    setServiceName (state, name) { state.servicename = name },
    setNameSpace (state, namespace) { state.namespace = namespace },
    setIngressName (state, ingressname) { state.ingressname = ingressname }
  },
  getters: {
    ingressname (state) { return state.ingressname }
  },
  actions: {
  },
  modules: {
  }
})
