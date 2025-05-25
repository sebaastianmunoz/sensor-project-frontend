<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline text-center">
            Iniciar Sesión
          </v-card-title>

          <v-card-subtitle class="text-center">
            Accede para ver los datos del clima
          </v-card-subtitle>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                label="Correo Electrónico"
                type="email"
                required
                outlined
                :rules="emailRules"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Contraseña"
                type="password"
                required
                outlined
                :rules="passwordRules"
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                @click="login"
                color="primary"
                block
                large
              >
                Iniciar sesión
              </v-btn>

              <v-alert v-if="errorMessage" type="error" dense text class="mt-3">
                {{ errorMessage }}
              </v-alert>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn text @click="forgotPassword"
              >¿Olvidaste tu contraseña?</v-btn
            >
            <v-btn text @click="goToSignup">Crear una cuenta</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth } from "@/firebase"; // Ajusta la ruta según tu proyecto
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      errorMessage: "",
      emailRules: [
        (v) => !!v || "El correo es obligatorio",
        (v) => /.+@.+\..+/.test(v) || "El correo debe ser válido",
      ],
      passwordRules: [
        (v) => !!v || "La contraseña es obligatoria",
        (v) =>
          v.length >= 6 || "La contraseña debe tener al menos 6 caracteres",
      ],
    };
  },
  methods: {
    async login() {
      this.errorMessage = "";
      const form = this.$refs.form;
      if (form.validate()) {
        try {
          await signInWithEmailAndPassword(auth, this.email, this.password);
          this.$router.push("/dashboard");
        } catch (error) {
          this.errorMessage = "Error al iniciar sesión: " + error.message;
        }
      }
    },
    forgotPassword() {
      // Aquí puedes agregar la lógica para recuperar la contraseña
      alert("Función para recuperar contraseña aquí.");
    },
    goToSignup() {
      this.$router.push("/signup");
    },
  },
};
</script>

<style scoped>
.v-card {
  background-color: #f4f4f9;
}

.v-btn {
  margin-top: 10px;
  border-radius: 25px;
}

.v-card-subtitle {
  color: #4f4f4f;
}
</style>
