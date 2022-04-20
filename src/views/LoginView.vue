<template>
  <div>
    <v-alert v-show="alerta.ver" :type="alerta.tipo">
      {{ alerta.mensaje }}
    </v-alert>
    <v-container class="my-16">
      <v-row no-gutters>
        <v-col cols="3"></v-col>
        <v-col cols="6">
          <v-card class="pa-7">
            <v-card-title class="justify-center">
              Inicio de Sesión
            </v-card-title>
            <v-card-text>
              Ingrese sus credenciales para iniciar sesión.
            </v-card-text>
            <v-form>
              <v-text-field
                label="Usuario"
                v-model="usuario"
                filled
                dense
              ></v-text-field>
              <v-text-field
                label="Contraseña"
                type="password"
                v-model="contrasenia"
                filled
                dense
              ></v-text-field>
              <v-btn block @click="iniciarSesion()" color="primary">
                Ingresar
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import postLogin from "../backend/login";
import { postUpdateUser, postReadUser } from "../backend/crudUsuarios";
import { validarEmail } from "../utils/validaciones";

export default {
  data() {
    return {
      usuario: "mdvargas@frd.org.mx",
      contrasenia: "Mexico123",
      alerta: {
        ver: false,
        mensaje: "",
        tipo: null,
      },
    };
  },

  methods: {
    async iniciarSesion() {
      var sesionActiva = await postReadUser({
        usuario: this.usuario,
      });

      console.log("sesionActiva", sesionActiva);

      if (
        (!this.usuario == null && !this.contrasenia == null) ||
        (!this.usuario == "" && !this.contrasenia == "")
      ) {
        if (validarEmail(this.usuario)) {
          let body = {
            usuario: this.usuario,
            contrasenia: this.contrasenia,
          };

          let body2 = {
            usuarioBusqueda: this.usuario,
            sesion: "true",
          };

          let respuesta = await postLogin(body);

          if (respuesta.data.codigo === 111) {
            if (respuesta.data.mensaje.estatus === "ACTIVO") {
              if (sesionActiva.data.mensaje.sesion == "false") {
                // localStorage.sesionValida = true;
                // localStorage.datosUsuario = respuesta.data.mensaje.nombre;

                // ------------------
                await postUpdateUser(body2);
                // ------------------
                this.asignaDatosSesionActiva();
                this.$store.commit("setSesionValida", true);
                this.$store.commit(
                  "setDatosUsuario",
                  respuesta.data.mensaje.nombre
                );
                this.$store.commit(
                  "setUsuario",
                  respuesta.data.mensaje.usuario
                );
                this.$router.replace({ name: "Bienvenida" });
              } else {
                this.mostrarAlerta(
                  "No se permiten mas sesiones activas para este usuario",
                  "error"
                );
                this.cerrarAlerta();
              }
            } else {
              this.mostrarAlerta("Usuario Sin Acceso", "warning");
              this.cerrarAlerta();
            }
          } else {
            this.mostrarAlerta("Usuario no encontrado", "error");
            this.cerrarAlerta();
          }
          console.log("respuesta: ", respuesta);
        } else {
          this.mostrarAlerta("Usuario no válido", "info");
          this.cerrarAlerta();
        }
      } else {
        this.mostrarAlerta("No se permiten campos vacíos", "info");
        this.cerrarAlerta();
      }
    },

    asignaDatosSesionActiva() {
      var timestamp = new Date().getTime();
      window.name = timestamp;
      this.$store.commit("setSesionId", String(timestamp));
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
