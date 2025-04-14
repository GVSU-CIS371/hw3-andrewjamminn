<template>
  <div>
    <Beverage :isIced="beverageStore.currentTemp === 'Cold'" 
              :currentBase="beverageStore.currentBase"
              :currentCreamer="beverageStore.currentCreamer"
              :currentSyrup="beverageStore.currentSyrup"/>
    <ul>
      <li>
        <template v-for="temp in beverageStore.temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="beverageStore.currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>
    </ul>
    <ul>
      <li>
        <template v-for="b in beverageStore.bases" :key="b.id">
          <label>
            <input
              type="radio"
              name="bases"
              :id="`r${b.id}`"
              :value="b"
              v-model="beverageStore.currentBase"
            />
            {{ b.name }}
          </label>
        </template>
      </li>
    </ul>
    <ul>
      <li>
        <template v-for="s in beverageStore.syrups" :key="s.id">
          <label>
            <input
              type="radio"
              name="syrups"
              :id="`r${s.id}`"
              :value="s"
              v-model="beverageStore.currentSyrup"
            />
            {{ s.name }}
          </label>
        </template>
      </li>
    </ul>
    <ul>
      <li>
        <template v-for="c in beverageStore.creamers" :key="c.id">
          <label>
            <input
              type="radio"
              name="creamers"
              :id="`r${c.id}`"
              :value="c"
              v-model="beverageStore.currentCreamer"
            />
            {{ c.name }}
          </label>
        </template>
      </li>
      <!-- Name input, Make Beverage, Clear List button -->
      <li class="recipe-create">
        <label>
          <input type="text" v-model="beverageName" placeholder="Beverage Name" />
        </label>
        <button style="margin-right:15px" @click="createBeverage">Make Beverage</button>
      </li>
    </ul>
    
  </div>
  <div id="beverage-container" class="saved-beverages">
    <h3>Saved Beverages</h3>
      <ul class="beverage-list">
        <li v-for="(beverage, index) in beverageStore.beverages" :key="index">
          <label>
            <input 
              type="radio" 
              name="beverages"
              :value="index"
              v-model="selectedBeverageIndex"
              @change="loadSelectedBeverage"
            />
            {{ beverage.name }} - {{ beverage.temp }} {{ beverage.base?.name || 'No Base' }} with 
            {{ beverage.creamer?.name || 'No Creamer' }} and {{ beverage.syrup?.name || 'No Syrup' }}
          </label>
        </li>
      </ul>

  </div>
</template>

<script setup lang="ts">
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";
import { ref } from 'vue';
const beverageStore = useBeverageStore();
const beverageName = ref('');
const selectedBeverageIndex = ref<number | null>(null);

const createBeverage = () => {
  beverageStore.makeBeverage(beverageName.value || 'Untitled Beverage');
  beverageName.value = ''; // Clear the input after creating
};

const loadSelectedBeverage = () => {
  if (selectedBeverageIndex.value !== null) {
    beverageStore.showBeverage(selectedBeverageIndex.value);
  }
};

</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}

.recipe-create {
  margin-top: 15px;
  padding: 10px;
  
  label {
    margin-right: 10px;
  }
  
  input[type="text"] {
    padding: 5px;
    margin-right: 10px;
  }
  
  button {
    padding: 5px 10px;
    background-color: #4a2c17;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    
    &:hover {
      background-color: #6e4228;
    }
  }
}

.saved-beverages {
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  
  h3 {
    margin-top: 0;
  }
  
  ul {
    padding-left: 10px;
  }
  
  li {
    margin-bottom: 5px;
  }
}
</style>
