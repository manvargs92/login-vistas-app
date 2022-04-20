import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import createMultiTabState from "vuex-multi-tab-state";

Vue.use(Vuex);

const vuexVault = new VuexPersist({
  key: "login-vistas-app",
  storage: window.localStorage,
  reducer: (state) => ({
    sesionValida: state.sesionValida,
    sesionId: state.sesionId,
    datosUsuario: state.datosUsuario,
    usuario: state.usuario,
    fotos: state.fotos,
  }),
});

export default new Vuex.Store({
  plugins: [
    vuexVault.plugin,
    createMultiTabState({ statesPaths: ["sesionId"] }),
  ],

  state: {
    sesionValida: false,
    sesionId: "algo",
    datosUsuario: null,
    usuario: null,
    fotos: [
      {
        nombre: "Cámara",
        src: "https://images.pexels.com/photos/10614527/pexels-photo-10614527.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      },
      {
        nombre: "Moto",
        src: "https://images.pexels.com/photos/1289538/pexels-photo-1289538.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
      {
        nombre: "Circuito integrado",
        src: "https://images.pexels.com/photos/343457/pexels-photo-343457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
  getters: {
    getSesionValida(estado) {
      return estado.sesionValida;
    },
    getDatosUsuario(estado) {
      return estado.datosUsuario;
    },
    getUsuario(estado) {
      return estado.usuario;
    },
  },
  mutations: {
    setSesionValida(estado, valor) {
      estado.sesionValida = valor;
    },
    setSesionId(estado, valor) {
      estado.sesionId = valor
    },
    setDatosUsuario(estado, valor) {
      estado.datosUsuario = valor;
    },
    setUsuario(estado, valor) {
      estado.usuario = valor;
    },
    setFotos(estado, valor) {
      estado.fotos.push(valor);
    },
  },
  actions: {
    setSesionValida(contexto, valor) {
      contexto.commit("setSesionValida", valor);
    },
    setSesionId(contexto, valor) {
      contexto.commit("setSesionId", valor);
    },
    setDatosUsuario(contexto, valor) {
      contexto.commit("setDatosUsuario", valor);
    },
    setUsuario(contexto, valor) {
      contexto.commit("setUsuario", valor);
    },
    setFotos(contexto, valor) {
      contexto.commit("setFotos", valor);
    },
  },
  modules: {},
});
