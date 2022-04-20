<template>
  <div>
    <div v-if="this.$route.path != '/login'">
      <v-app-bar app>
        <v-app-bar-nav-icon
          @click="mostrarMenu = !mostrarMenu"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>{{ this.$route.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title
          >Tiempo restante de sesión: {{ minutos | tiempo }}:{{
            segundos | tiempo
          }}</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn icon @click="logout">
          Salir
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="mostrarMenu" temporary app>
        <v-list>
          <v-list-item-title class="text-h6 justify-center">
            Menú
          </v-list-item-title>
          <v-list-item-group v-model="itemSeleccionado" color="indigo">
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.route">
              <v-list-item-icon>
                <v-icon>{{ item.icono }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.texto }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import { postUpdateUser } from "../backend/crudUsuarios";

export default {
  name: "MenuNavegacion",

  props: {
    minutos: Number,
    segundos: Number,
  },

  filters: {
    tiempo: function (valor) {
      let minutos = valor;
      if (minutos < 10) {
        minutos = "0" + minutos;
      }
      return minutos;
    },
  },

  data() {
    return {
      mostrarMenu: false,
      itemSeleccionado: 1,
      items: [
        {
          texto: "Bienvenida",
          icono: "mdi-home",
          route: "/bienvenida",
        },
        {
          texto: "Carrusel de Imágenes",
          icono: "mdi-view-carousel",
          route: "/carousel",
        },
        {
          texto: "Inventario de Usuarios",
          icono: "mdi-table-account",
          route: "/inventariousuarios",
        },
        {
          texto: "Gestión de usuarios",
          icono: "mdi-account-supervisor",
          route: "/gestion",
        },
      ],
    };
  },

  methods: {
    async logout() {
      let body = {
        usuarioBusqueda: this.$store.state.usuario,
        sesion: "false",
      };
      await postUpdateUser(body);
      this.$emit("click", false, 1, 59);
      this.$store.commit("setSesionValida", false);
      this.$store.commit("setDatosUsuario", null);
      this.$router.replace({ name: "Login" });
    },
  },
};
</script>

<style></style>
