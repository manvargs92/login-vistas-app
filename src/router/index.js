import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

import LoginView from "../views/LoginView.vue";
import VistaBienvenida from "../views/VistaBienvenida.vue";
import InventarioUsuarios from "../views/InventarioUsuarios.vue";
import Carousel from "../views/CarouselView.vue";
import GestionUsuariosView from "../views/GestionUsuariosView.vue";

import AltaUsuario from "../components/AltaUsuario.vue";
import BajaUsuario from "../components/BajaUsuario.vue";
import ActualizaUsuario from "../components/ActualizaUsuario.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView,
  // },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/bienvenida",
    name: "Bienvenida",
    component: VistaBienvenida,
  },
  {
    path: "/inventariousuarios",
    name: "Inventario de Usuarios",
    component: InventarioUsuarios,
  },
  {
    path: "/carousel",
    name: "Carrusel de Imágenes",
    component: Carousel,
  },
  {
    path: "/gestion",
    name: "Gestión de Usuarios",
    component: GestionUsuariosView,
    children: [
      {
        path: "alta",
        name: "Dar de Alta",
        components: {
          insiderouter: AltaUsuario,
        },
      },
      {
        path: "baja",
        name: "Dar de Baja",
        components: {
          insiderouter: BajaUsuario,
        },
      },
      {
        path: "actualiza",
        name: "Actualizar",
        components: {
          insiderouter: ActualizaUsuario,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
