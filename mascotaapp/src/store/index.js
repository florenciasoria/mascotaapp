import Vue from 'vue';
import Vuex from 'vuex';
import mascotas from '../assets/js/mascotas.js'
import usuarios from '../assets/js/usuarios.js'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // esto le pone valor inicial a la variable mascotas (el array)
        mascotas,
        usuarios
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


        agregarusuario(state, usuario) {
        state.usuarios.push(usuario);
        },
        eliminarusuario(state, id) {
            state.usuarios = state.usuarios.filter((usuario) => usuario.id != id)
        },
        editarusuario(state, nuevoArrayDeUsuarios) {
            state.usuarios = nuevoArrayDeUsuarios;
        }
    },
    actions: {
        agregarusuario({commit}, usuario) {
            commit("agregarusuario",usuario)
        },
    },
    getters: {
        getmascotas: (state) => {
            return state.mascotas
        },
        getusuarios: (state) => {
            return state.usuarios
        }
    }

});