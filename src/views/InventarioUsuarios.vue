<template>
  <div>
    <v-container>
      <v-row cols="12" no-gutters>
        <v-col cols="1"></v-col>
        <v-col cols="10">
          <v-data-table
            :headers="cabeceras"
            :items="usuarios"
            :items-per-page="15"
            class="elevation-1"
          ></v-data-table>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { postReadAllUsers } from "../backend/crudUsuarios";

export default {
  data() {
    return {
      nombre: "",
      usuario: "",
      estatus: "",
      cabeceras: [
        { text: "Nombre", align: "start", value: "nombre" },
        { text: "Usuario", value: "usuario" },
        { text: "Estatus", value: "estatus" },
      ],
      usuarios: [],
    };
  },

  async created() {
    let respuesta = await postReadAllUsers();
    console.log(respuesta);
    this.usuarios = respuesta.data.mensaje;
  }
};
</script>

<style></style>
