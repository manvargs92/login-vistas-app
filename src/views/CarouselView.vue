<template>
  <div>
    <v-alert v-show="alerta.ver" :type="alerta.tipo">
      {{ alerta.mensaje }}
    </v-alert>
    <v-card class="ma-16">
      <v-carousel cycle>
        <v-carousel-item v-for="(foto, i) in fotos" :key="i" :src="foto.src">
          <h1>
            <span v-text="foto.nombre" class="orange--text"></span>
          </h1>
        </v-carousel-item>
      </v-carousel>
      <div class="pa-7">
        <v-form>
          <v-text-field
            label="Nombre de la imágen"
            v-model="nombre"
            filled
            dense
          ></v-text-field>
          <v-text-field label="URL" v-model="url" filled dense></v-text-field>
          <div>
            <v-btn
              :disabled="estaDesactivado"
              @click="agregarImagen()"
              color="primary"
            >
              Agregar Imágen desde URL
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-card>
  </div>
</template>

<script>
import { validarUrl } from "../utils/validaciones";

export default {
  data() {
    return {
      fotos: [],
      nombre: "",
      url: "",
      estaDesactivado: true,
      alerta: {
        ver: false,
        mensaje: "",
        tipo: null,
      },
    };
  },

  methods: {
    agregarImagen() {
      if (validarUrl(this.url)) {
        this.$store.commit("setFotos", { nombre: this.nombre, src: this.url });
        this.mostrarAlerta("Imágen agregada", "success");
        this.cerrarAlerta();
      } else {
        this.mostrarAlerta("Formato de URL NO válida", "warning");
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
      if (this.nombre.length !== 0 && this.url.length !== 0) {
        this.estaDesactivado = false;
      }
    },
    url() {
      if (this.nombre.length !== 0 && this.url.length !== 0) {
        this.estaDesactivado = false;
      }
    },
  },

  created() {
    this.fotos = this.$store.state.fotos;
  },
};
</script>
