import axios from 'axios'

const client = axios.create({
    baseURL: "https://61881130057b9b00177f9ba9.mockapi.io/Solicitudes/"
})

export default {
    get(){
        return client.get()
    },
    getById(id){
        return client.get(`/${id}`)
    },
    delete(id){
        return client.delete(`/${id}`)
    },
    post(solicitud){
        return client.post(this.baseURL, solicitud)
    },
    put(solicitud){
        return client.put(solicitud)
    }
}