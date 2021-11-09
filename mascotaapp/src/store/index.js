import Vue from 'vue';
import Vuex from 'vuex';
import mascotas from '../assets/js/mascotas.js'
import usuariosLog from '../assets/js/usuariosLog.js'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // esto le pone valor inicial a la variable mascotas (el array)
        mascotas,
        usuariosLog
    },
    mutations: {

        agregarmascota(state, mascota) {
           state.mascotas.push(mascota);
        },
        eliminarmascota(state, id) {
            state.mascotas = state.mascotas.filter((mascota) => mascota.id != id)
        },
        editarmascota(state, nuevoArrayDeMascotas) {
            state.mascotas = nuevoArrayDeMascotas;
        },


        agregarusuarioLog(state, usuario) {

            state.usuariosLog.push(usuario);
        },
        eliminarusuarioLog(state) {
            //state.usuariosLog = state.usuariosLog.filter((usuario) => usuario.id != id)
            console.log("Eliminar usuario log ", state.usuariosLog)
            state.usuariosLog.pop()
        },
        editarusuarioLog(state, nuevoArrayDeUsuarios) {
            state.usuariosLog = nuevoArrayDeUsuarios;
        }
    },
    actions: {
        agregarusuarioLog({commit}, usuario) {
            commit("agregarusuarioLog",usuario)
        },
        cerrarSesion2({commit}) {
            console.log("Cerrar sesion 2")
            commit("eliminarusuarioLog")
        },
        
    },
    getters: {
        getmascotas: (state) => {
            return state.mascotas
        },
        getusuariosLog: (state) => {
            return state.usuariosLog
        }
    }

});