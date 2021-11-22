import Vue from 'vue';
import Vuex from 'vuex';
import usuariosLog from '../assets/js/usuariosLog.js'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usuariosLog
    },
    mutations: {
        agregarusuarioLog(state, usuario) {
            state.usuariosLog = usuario;
        },
        eliminarusuarioLog(state) {
            state.usuariosLog = {}
        },
        editarusuarioLog(state, nuevoArrayDeUsuarios) {
            state.usuariosLog = nuevoArrayDeUsuarios;
        }
    },
    actions: {
        agregarusuarioLog({ commit }, usuario) {
            commit("agregarusuarioLog", usuario)
        },
        cerrarSesionStore({ commit }) {
            commit("eliminarusuarioLog")
        },

    },
    getters: {
        getusuariosLog: (state) => {
            return state.usuariosLog
        }
    }

});