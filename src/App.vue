<template>
  <v-app>
    <v-main>
      <DialogoLimiteSesion
        :verDialogoLimiteSesion="verDialogoLimiteSesion"
        @click="restableceDialogoYCronSesion"
      />
      <MenuNavegacion
        v-if="this.$route.path != '/login'"
        :minutos="minutos"
        :segundos="segundos"
        @click="restableceDialogoYCronSesion"
      />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { postUpdateUser } from "./backend/crudUsuarios";
import { CronJob, CronTime } from "cron";
import DialogoLimiteSesion from "@/components/DialogoLimiteSesion.vue";
import MenuNavegacion from "@/components/MenuNavegacion.vue";

export default {
  name: "App",
  components: { DialogoLimiteSesion, MenuNavegacion },

  data() {
    return {
      minutos: 1,
      segundos: 59,
      verDialogoLimiteSesion: false,
    };
  },

  methods: {
    async restabCredenciales() {
      let body = {
        usuarioBusqueda: this.$store.state.usuario,
        sesion: "false",
      };
      await postUpdateUser(body);
      this.$store.commit("setSesionValida", false);
      this.$store.commit("setDatosUsuario", null);
    },

    cronSesion() {
      console.log("Tiempo de sesión corriendo...");
      if (this.segundos > -1 && this.minutos > -1) {
        this.segundos -= 1;
        if (this.segundos === -1) {
          this.minutos -= 1;
          this.segundos = 59;
          if (this.minutos == -1) {
            this.restabCredenciales();
            this.verDialogoLimiteSesion = true;
            console.log("Tiempo de sesión finalizado.");
            console.log(this.verDialogoLimiteSesion);
          }
        }
      }
    },

    restableceDialogoYCronSesion(valor, minutos, segundos) {
      this.verDialogoLimiteSesion = valor;
      this.minutos = minutos;
      this.segundos = segundos;
    },
  },

  computed: {
    obtenerIdSesion() {
      return String(this.$store.state.sesionId);
    },

    obtenerNombreTabActual() {
      return String(window.name);
    },
  },

  async beforeCreate() {
    if (this.$route.path != "/login") {
      this.$router.push({ name: "Login" });
    }
  },

  mounted() {
    var self = this;
    var job = new CronJob({
      cronTime: "* * * * * *",
      onTick: function () {
        // if (self.obtenerIdSesion === self.obtenerNombreTabActual) {
        //   console.log("tab válida");
        // } else {
        //   console.log(self.obtenerIdSesion);
        // }

        if (
          self.$store.state.sesionValida &&
          self.$route.path !== "/login"
        ) {
          self.cronSesion();
        }
      },
    });
    job.start();
  },
};
</script>
