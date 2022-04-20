<template>
  <div>
    <v-dialog
      v-model="verDialgoAFK"
      persistent
      max-width="350"
      transition="scale-transition"
    >
      <v-card>
        <v-card-title>Sesión terminada por inactividad</v-card-title>
        <v-card-text>Serás reenviado al incio de sesión</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cerrarDialogoAFK" color="primary">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="verDialogoLimiteSesion"
      persistent
      max-width="350"
      transition="scale-transition"
    >
      <v-card>
        <v-card-title>Tiempo de sesión permitida<br>terminado</v-card-title>
        <v-card-text>Serás reenviado al incio de sesión</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cerrarDialogoLS" color="primary">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { postUpdateUser } from "../backend/crudUsuarios";

export default {
  name: "DialogoLimiteSesion",

  props: {
    verDialogoLimiteSesion: Boolean,
    default: false,
  },

  data() {
    return {
      verDialgoAFK: false,
      verDialogoLS: this.verDialogoLimiteSesion,
    };
  },

  methods: {
    cerrarDialogoAFK() {
      this.$router.replace({ name: "Login" });
      this.verDialgoAFK = false;
      this.$emit("click", false, 1, 59);
    },
    cerrarDialogoLS() {
      this.$router.replace({ name: "Login" });
      this.verDialogoLS = false;
      this.$emit("click", false, 1, 59);
    },
  },

  async onIdle() {
    if (this.$route.path != "/login" && this.$store.state.sesionValida) {
      let body = {
        usuarioBusqueda: this.$store.state.usuario,
        sesion: "false",
      };
      await postUpdateUser(body);
      this.verDialgoAFK = true;
      this.$store.commit("setSesionValida", false);
      this.$store.commit("setDatosUsuario", null);
    }
  },
};
</script>
