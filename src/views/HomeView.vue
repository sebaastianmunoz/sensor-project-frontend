<template>
  <v-container fluid>
    <v-row>
      <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
          />
        </div>

        <v-spacer></v-spacer>

        <button @click="logout">Cerrar sesión</button>
      </v-app-bar>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" v-for="sensor in sensors" :key="sensor.id">
        <SensorCard :sensor="sensor" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import SensorCard from "@/components/SensorCard.vue";
import { auth } from "../firebase";

export default {
  components: { SensorCard },
  computed: mapState(["sensors"]),
  methods: {
    async logout() {
      await auth.signOut();
      this.$router.push("/");
    },
  },
};
</script>
