import axios from 'axios'

const client = axios.create({
    baseURL: "https://618090a88bfae60017adfb35.mockapi.io/mascotas/"
})

export default {
    get(){
        return client.get()
    },
    getById(id){
        return client.get(`/${id}`)
    },
    // getByIdPublicante(id){
    //     return client.get(`/${id}`)
    // },
    delete(id){
        return client.delete(`/${id}`)
    },
    post(mascota){
        return client.post(this.baseURL, mascota)
    },
    put(mascota){
        return client.put(mascota)
    }
}