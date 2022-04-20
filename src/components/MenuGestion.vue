<template>
  <div>
    <v-btn
      v-for="enlace in enlaces"
      :key="enlace.nombre"
      class="ma-2"
      @click="mostrarFormulario(enlace.ruta)"
      :color="enlace.color"
    >
      {{ enlace.nombre }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "MenuGestion",
  data() {
    return {
      enlaces: [
        {
          nombre: "Dar de Alta",
          ruta: "/gestion/alta",
          color: "success",
        },
        {
          nombre: "Dar de Baja",
          ruta: "/gestion/baja",
          color: "secondary",
        },
        {
          nombre: "Actualizar",
          ruta: "/gestion/actualiza",
          color: "warning",
        },
      ],
    };
  },
  methods: {
    mostrarFormulario(enlace) {
      this.$router.replace(enlace).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style></style>
