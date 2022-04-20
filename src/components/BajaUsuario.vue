<template>
  <div>
    <v-alert v-show="alerta.ver" :type="alerta.tipo">
      {{ alerta.mensaje }}
    </v-alert>
    <v-card class="pa-5">
      <v-card-title>Baja de usuario</v-card-title>
      <v-form>
        <v-text-field
          label="Usuario"
          v-model="usuario"
          filled
          dense
        ></v-text-field>
        <v-card-actions>
          <v-btn @click="eliminarUsuario()" color="error"
            >Eliminar usuario</v-btn
          >
          <v-btn @click="desactivarUsuario()" color="warning"
            >Desactivar usuario</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { postUpdateUser, postDeleteUser } from "../backend/crudUsuarios";

export default {
  name: "BajaUsuario",

  data() {
    return {
      usuario: "",
      alerta: {
        ver: false,
        mensaje: "",
        tipo: null,
      },
    };
  },

  methods: {
    async eliminarUsuario() {
      let body = {
        usuario: this.usuario,
      };

      let respuesta = await postDeleteUser(body);

      if (respuesta.data.codigo === 111) {
        this.usuarioEncontrado = true;
        this.mostrarAlerta("Usuario Eliminado", "success");
        this.cerrarAlerta();
      } else {
        this.mostrarAlerta("Usuario no encontrado", "warning");
        this.cerrarAlerta();
      }

      console.log(respuesta);
    },

    async desactivarUsuario() {
      let body = {
        usuarioBusqueda: this.usuario,
        estatus: "INACTIVO",
      };

      let respuesta = await postUpdateUser(body);

      if (respuesta.data.codigo === 111) {
        this.usuarioEncontrado = true;
        this.mostrarAlerta("Usuario Desactivado", "success");
        this.cerrarAlerta();
      } else {
        this.mostrarAlerta("Usuario no encontrado", "warning");
        this.cerrarAlerta();
      }

      console.log(respuesta);
    },

    mostrarAlerta(mensaje, tipo) {
      this.alerta.ver = true;
      this.alerta.mensaje = mensaje;
      this.alerta.tipo = tipo;
    },

    cerrarAlerta() {
      setTimeout(() => {
        this.alerta.ver = false;
      }, 3000);
    },
  },
};
</script>

<style></style>
