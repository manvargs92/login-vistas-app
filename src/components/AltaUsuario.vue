<template>
  <div>
    <v-alert v-show="alerta.ver" :type="alerta.tipo">
      {{ alerta.mensaje }}
    </v-alert>
    <v-card class="pa-5">
      <v-card-title>Alta de usuario</v-card-title>
      <v-form>
        <v-text-field
          label="Nombre"
          v-model="nombre"
          filled
          dense
        ></v-text-field>
        <v-text-field
          label="Usuario"
          v-model="usuario"
          filled
          dense
        ></v-text-field>
        <v-text-field
          label="Contraseña"
          v-model="contrasenia"
          filled
          dense
        ></v-text-field>
        <v-checkbox
          v-model="esAdmin"
          label="Permisos de Administrador"
        ></v-checkbox>
        <v-btn
          :disabled="estaDesactivado"
          @click="registrarUsuario()"
          color="primary"
        >
          Registrar
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { postCreateUser } from "../backend/crudUsuarios";
import { validarEmail } from "../utils/validaciones";

export default {
  name: "AltaUsuario",

  data() {
    return {
      nombre: "",
      usuario: "",
      contrasenia: "",
      estaDesactivado: true,
      esAdmin: false,
      alerta: {
        ver: false,
        mensaje: "",
        tipo: null,
      },
    };
  },

  methods: {
    async registrarUsuario() {
      if (validarEmail(this.usuario)) {
        let body = {
          nombre: this.nombre,
          usuario: this.usuario,
          contrasenia: this.contrasenia,
          admin: String(this.esAdmin),
        };

        let respuesta = await postCreateUser(body);

        this.mostrarAlerta("Usuario registrado exitósamente", "success");
        this.cerrarAlerta();

        console.log(respuesta);
      } else {
        this.mostrarAlerta("Usuario no válido", "info");
        this.cerrarAlerta();
      }
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

  watch: {
    nombre() {
      if (
        this.nombre.length === 0 ||
        this.usuario.length === 0 ||
        this.contrasenia.length === 0
      ) {
        this.estaDesactivado = true;
      } else {
        this.estaDesactivado = false;
      }
    },
    usuario() {
      if (
        this.nombre.length === 0 ||
        this.usuario.length === 0 ||
        this.contrasenia.length === 0
      ) {
        this.estaDesactivado = true;
      } else {
        this.estaDesactivado = false;
      }
    },
    contrasenia() {
      if (
        this.nombre.length === 0 ||
        this.usuario.length === 0 ||
        this.contrasenia.length === 0
      ) {
        this.estaDesactivado = true;
      } else {
        this.estaDesactivado = false;
      }
    },
  },
};
</script>

<style></style>
