<template>
    <div class="Errores">
        <div class="container">
            <b-row>
                <b-col class="mt-3 col-6 mx-auto border rounded">
                    <b-row>
                        <b-col class="mt-2 p-5">
                            <h4>Lo sentimos! hubo un error</h4>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="imgn">
                            <img :src="errorAMostrar.img" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="my-3">{{ errorAMostrar.msj }}</b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src


export default {
    name: 'Error',
    components: {

    },
    created() {
        console.log("Codigo de error ", this.$route.params.codError, this.$route.params.mensaje)
        switch (this.$route.params.codError) {
            case 'errorPermisos':
                this.errorAMostrar = this.errorPermisos
                break
            case 'Request failed with status code 429':
                this.errorAMostrar = this.errorApi
                break
            case 'errorSistema':
            default: 
            this.errorAMostrar = this.errorSistema
                this.errorSistema.msj = this.$route.params.mensaje
        }
    },

    data() {
        return {
            errorAMostrar: {},
            errorPermisos: {
                img: 'https://i.ibb.co/9vJKd39/cat-scratching-door-s1.jpg',
                msj: 'No tenés permiso para ver esta página'
            }
            , errorSistema: {
                img: 'https://i.ibb.co/LnvMRQW/computer-cat.jpg',
                msj: ''
            }, errorApi: {
                img: 'https://i.ibb.co/LnvMRQW/computer-cat.jpg',
                msj: 'Estamos teniendo mucho tráfico, por favor, esperá unos segundos y volvé a intentarlo'
            }
        }
    }
}
</script>
<style scoped>
img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
</style>