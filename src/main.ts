import { createApp } from "vue";
import "./styles/mug.scss";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import App from "./App.vue";
import { useBeverageStore } from "./stores/beverageStore.ts";


// Create Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

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