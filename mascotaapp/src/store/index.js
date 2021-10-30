import Vue from 'vue';
import Vuex from 'vuex';
import mascotas from '../assets/js/mascotas.js'
import usuarios from '../assets/js/users.js'


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        // esto le pone valor inicial a la variable mascotas (el array)
        mascotas,
        usuarios
    },
    mutations:{
        
        agregarmascota (state, mascota) {
            state.mascotas = state.mascotas.push(mascota);
          },
        eliminarmascota (state, id) {
            state.mascotas = state.mascotas.filter((mascota) => mascota.id != id)
          },
        editarmascota (state, nuevoArrayDeMascotas) {
            state.mascotas = nuevoArrayDeMascotas;
          }
    },
    actions:{
    

    },
    getters:{
        getmascotas:(state) => {
            return state.mascotas
        },
        getusuarios:(state) => {
            return state.usuarios
        }
    }

}); 