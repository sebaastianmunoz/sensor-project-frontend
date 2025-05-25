// Importar los módulos necesarios de Firebase v9
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDxxgb7ntAljZV0ndeQZ8fGyeBNzHc5zMA",
  authDomain: "arduino-automated-irrigation.firebaseapp.com",
  projectId: "arduino-automated-irrigation",
  storageBucket: "arduino-automated-irrigation.firebasestorage.app",
  messagingSenderId: "172182838103",
  appId: "1:172182838103:web:a2d7817c7fe19249f47c12",
  measurementId: "G-V6XD3FY6M0",
  production: false,
  apiUrl: "http://localhost:8000",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener la instancia de autenticación
const auth = getAuth(app);

// Función que escucha el estado de autenticación
export function monitorAuthState(store) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Si el usuario está autenticado, guarda el usuario en Vuex
      store.dispatch("setUser", user);
    } else {
      // Si el usuario no está autenticado, pon el estado de usuario a null
      store.dispatch("logout");
    }
  });
}

// Exportar los métodos de autenticación
export { auth, signInWithEmailAndPassword, signOut };
