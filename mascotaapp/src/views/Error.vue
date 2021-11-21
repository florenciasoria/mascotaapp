<template>
    <div class="Errores">
        <div class="container w-100">
            <b-row>
                <b-col class="mx-auto">Lo sentimos! hubo un error</b-col>
            </b-row>
            <b-row>
                <b-col class="mx-auto">
                    <img :src="errorAMostrar.img" />
                </b-col>
            </b-row>

            <b-row>
                <b-col class="mx-auto">{{ errorAMostrar.msj }}</b-col>
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
        console.log("Codigo de error ", this.$route.params.codError)
        switch (this.$route.params.codError ) {
            case 'errorPermisos':
             this.errorAMostrar = this.errorPermisos

        }
        },
    
    data() {
        return {
            errorAMostrar: {},
            errorPermisos: {
                img: 'https://i.ibb.co/9vJKd39/cat-scratching-door-s1.jpg',
                msj: 'No tenés permiso para ver esta página'
            }
        }
    }
}
</script>