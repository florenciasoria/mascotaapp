import axios from 'axios'

const client = axios.create({
    baseURL: "https://618090a88bfae60017adfb35.mockapi.io/usuarios/"
})

export default {

    get() {
        return client.get()
    },
    getById(id) {
        return client.get(`/${id}`)
    },

    delete(id) {
        return client.delete(`/${id}`)
    },
    post(persona) {
        return client.post(this.baseURL, persona)
    },
    put(persona) {
        //return client.put(persona)
        return client.put(`/${persona.id}`, persona)
    }
}