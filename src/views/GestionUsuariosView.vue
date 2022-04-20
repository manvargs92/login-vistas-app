<template>
  <div>
    <v-app-bar>
      <v-spacer></v-spacer>
      <menu-gestion />
      <v-spacer></v-spacer>
    </v-app-bar>
    <router-view name="insiderouter" />
  </div>
</template>

<script>
import MenuGestion from "@/components/MenuGestion.vue";

export default {
  name: "GestionUsuariosView",

  components: { MenuGestion },
};
</script>

<style></style>
