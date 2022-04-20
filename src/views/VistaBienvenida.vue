<template>
  <div class="ma-16 pa-5">
    <span v-once>
      <h1>Bienvenido {{ nombreUsuario }}</h1>
    </span>
    <p v-once>
      La fecha de hoy es <span>{{ obtenerFecha() }}</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombreUsuario: "",
      fechaActual: "La fecha de hoy es: ",
    };
  },

  methods: {
    obtenerFecha() {
      const fecha = Date.now();
      const hoy = new Date(fecha);
      return hoy.toDateString();
    },
  },

  created() {
    this.nombreUsuario = this.$store.state.datosUsuario;
  },
};
</script>

<style>
span {
  font-weight: bold;
}
</style>
