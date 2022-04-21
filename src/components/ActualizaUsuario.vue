<template>
  <div>
    <v-alert v-show="alerta.ver" :type="alerta.tipo">
      {{ alerta.mensaje }}
    </v-alert>
    <v-card class="pa-5">
      <v-card-title>Actualizar usuario</v-card-title>
      <v-form>
        <v-text-field
          label="Usuario"
          v-model="usuarioBusqueda"
          filled
          dense
        ></v-text-field>
        <v-btn @click="buscarUsuario()" color="primary">Buscar</v-btn>
      </v-form>
      <v-form v-show="usuarioEncontrado">
        <v-text-field
          label="Nuevo nombre"
          v-model="nombre"
          filled
          dense
        ></v-text-field>
        <v-text-field
          label="Nuevo usuario"
          v-model="usuario"
          filled
          dense
        ></v-text-field>
        <v-text-field
          label="Nueva contraseña"
          v-model="contrasenia"
          filled
          dense
        ></v-text-field>
        <v-radio-group v-model="esAdmin" label="Pernisos de Administrador">
          <v-radio label="Asignar" value="true"></v-radio>
          <v-radio label="Denegar" value="false"></v-radio>
        </v-radio-group>
        <v-card-actions>
          <v-btn
            :disabled="estaDesactivado"
            @click="actualizarUsuario()"
            color="primary"
          >
            Actualizar Datos
          </v-btn>
          <v-btn @click="activarUsuario()" color="success">
            Activar Usuario
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { postReadUser, postUpdateUser } from "../backend/crudUsuarios";
import { validarEmail } from "../utils/validaciones";

export default {
  name: "ActualizaUsuario",

  data() {
    return {
      usuarioBusqueda: "",
      nombre: "",
      usuario: "",
      contrasenia: "",
      usuarioEncontrado: false,
      estaDesactivado: true,
      esAdmin: null,
      alerta: {
        ver: false,
        mensaje: "",
        tipo: null,
      },
    };
  },

  methods: {
    async buscarUsuario() {
      let body = {
        usuario: this.usuarioBusqueda,
      };

      let respuesta = await postReadUser(body);

      console.log(respuesta);

      if (respuesta.data.codigo === 111) {
        this.usuarioEncontrado = true;
        this.mostrarAlerta("Usuario encontrado", "success");
        this.cerrarAlerta();
      } else {
        this.mostrarAlerta("Usuario no encontrado", "warning");
        this.cerrarAlerta();
      }
    },

    async actualizarUsuario() {
      let body = {
        usuarioBusqueda: this.usuarioBusqueda,
      };

      if (this.nombre.length !== 0) {
        body.nombre = this.nombre;
      }
      if (this.usuario.length !== 0) {
        if (validarEmail(this.usuario)) {
          body.usuario = this.usuario;
        } else {
          alert("Usuario no válido");
        }
      }
      if (this.contrasenia.length !== 0) {
        body.contrasenia = this.contrasenia;
      }
      if (this.esAdmin != null) {
        body.admin = String(this.esAdmin);
      }

      let respuesta = await postUpdateUser(body);
      console.log(respuesta);

      if (respuesta.data.codigo === 111) {
        this.usuarioEncontrado = true;
        this.mostrarAlerta("Usuario Actualizado", "success");
        this.cerrarAlerta();
      } else {
        this.mostrarAlerta("Hubo Un Error Al Actualizar", "error");
        this.cerrarAlerta();
      }
    },

    async activarUsuario() {
      let body = {
        usuarioBusqueda: this.usuarioBusqueda,
        estatus: "ACTIVO",
      };

      let respuesta = await postUpdateUser(body);

      if (respuesta.data.codigo === 111) {
        this.usuarioEncontrado = true;
        this.mostrarAlerta("Usuario Actualizado", "success");
        this.cerrarAlerta();
      } else {
        this.mostrarAlerta("Hubo Un Error Al Actualizar", "error");
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

  watch: {
    nombre() {
      if (
        this.nombre.length === 0 &&
        this.usuario.length === 0 &&
        this.contrasenia.length === 0
      ) {
        this.estaDesactivado = true;
      } else {
        this.estaDesactivado = false;
      }
    },
    usuario() {
      if (
        this.nombre.length === 0 &&
        this.usuario.length === 0 &&
        this.contrasenia.length === 0
      ) {
        this.estaDesactivado = true;
      } else {
        this.estaDesactivado = false;
      }
    },
    contrasenia() {
      if (
        this.nombre.length === 0 &&
        this.usuario.length === 0 &&
        this.contrasenia.length === 0
      ) {
        this.estaDesactivado = true;
      } else {
        this.estaDesactivado = false;
      }
    },
    esAdmin(v1, fgf) {
      console.log("Valor actual: " + v1 + "\n" + "valor anterior: " + fgf);

      if (v1 === null) {
        this.estaDesactivado = true;
      } else {
        this.estaDesactivado = false;
      }
    },
  },
};
</script>

<style></style>
