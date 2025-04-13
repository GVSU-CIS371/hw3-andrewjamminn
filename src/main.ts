import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { initializeApp } from 'firebase/app';
import { useBeverageStore } from './stores/beverageStore';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyB4NNc2fQMWmLULTxFzJnvKbiXISf6kzto",

  authDomain: "cis371-ce835.firebaseapp.com",

  projectId: "cis371-ce835",

  storageBucket: "cis371-ce835.firebasestorage.app",

  messagingSenderId: "930770370150",

  appId: "1:930770370150:web:a70754325c02c9e2e7f7a7"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Create Pinia
const pinia = createPinia();
// Register the plugin with Pinia
pinia.use(piniaPluginPersistedstate)

// Create Vue app
const app = createApp(App);
app.use(pinia);

// Initialize the beverage store before mounting the app
const beverageStore = useBeverageStore();

// Initialize the store and then mount the app
beverageStore.init().then(() => {
  app.mount('#app');
}).catch((error: any) => {
  console.error('Failed to initialize the app:', error);
  // You might want to show an error state here
});
