import axios from 'axios'

const client = axios.create({
    baseURL: "https://61881130057b9b00177f9ba9.mockapi.io/Solicitudes/"
})

export default {
    get() {
        return client.get()
    },
    getById(id) {
        return client.get(`/${id}`)
    },

    //get/solicitudes?solicitante="usuarioLogueado"
    //acá metí solicitante by id para no traernos toda la api cada vez que queramos traer a un solo solicitante
    getBySolicitante(id) {
        // console.log(`/?idAdoptante=${id}`)
        return client.get(`/?idAdoptante=${id}`)
    },

    //get/solicitudes?publicador="usuarioLogueado"
    getByPublicante(id) {
        //  console.log(`/?idPublicador=${id}`)
        return client.get(`/?idPublicador=${id}`)
    },

    getByMascota(id) {
        // console.log(`/?idMascota=${id}`)
        return client.get(`/?idMascota=${id}`)
    },
    getByEstado(estado) {
        return client.get(`/?estado=${estado}`)
    },

    delete(id) {
        return client.delete(`/${id}`)
    },
    post(solicitud) {
        return client.post(this.baseURL, solicitud)
    },
    put(solicitud) {
        return client.put(`/${solicitud.idSolicitud}`, solicitud)
    }
}