import axios from 'axios'

const client = axios.create({
    baseURL: "https://618090a88bfae60017adfb35.mockapi.io/api/personas/"
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
    post(persona){
        return client.post(persona)
    },
    put(persona){
        return client.put(persona)
    }
}