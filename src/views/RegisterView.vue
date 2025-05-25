<!-- src/components/Register.vue -->
<template>
  <div>
    <h1>Registrarse</h1>
    <form @submit.prevent="register">
      <div>
        <label for="email">Correo electrónico</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Registrarse</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { auth } from "../firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
        this.$router.push("/home");
      } catch (err) {
        this.error = err.message;
      }
    },
  },
};
</script>
