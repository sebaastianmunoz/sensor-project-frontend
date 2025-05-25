<template>
  <v-card class="pa-4" color="light-blue lighten-4">
    <v-card-title>{{ sensor.name }}</v-card-title>
    <v-card-text>
      <p>🌡️ Temperatura: {{ sensor.temperature }}°C</p>
      <p>💧 Humedad: {{ sensor.humidity }}%</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    sensor: Object,
  },
};
</script>
