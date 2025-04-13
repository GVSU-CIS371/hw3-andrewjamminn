import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";
import temperatures from "../data/temperatures.json";
import db from "../firebase.ts";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc
} from "firebase/firestore";

// Data for collections
const basesData = [
  { id: "b1", name: "Black Tea", color: "#8B4513" },
  { id: "b2", name: "Green Tea", color: "#C8E6C9" },
  { id: "b3", name: "Coffee", color: "#6F4E37" }
];
const creamersData = [
  { id: "c1", name: "No Cream", color: "transparent" },
  { id: "c2", name: "Milk", color: "AliceBlue" },
  { id: "c3", name: "Cream", color: "#F5F5DC" },
  { id: "c4", name: "Half & Half", color: "#FFFACD" }
];
const syrupsData = [
  { id: "s1", name: "No Syrup", color: "transparent" },
  { id: "s2", name: "Vanilla", color: "#FFEFD5" },
  { id: "s3", name: "Caramel", color: "#DAA520" },
  { id: "s4", name: "Hazelnut", color: "#6B4423" }
];

// Function to set up a collection with documents
async function setupCollection(collectionName: string, data: { id: string; name: string; color: string; }[]) {
  console.log(`Setting up ${collectionName} collection...`);
 
  for (const item of data) {
    try {
      // Use the provided id for the document ID
      await setDoc(doc(db, collectionName, item.id), item);
      console.log(`Added document ${item.id} to ${collectionName}`);
    } catch (error) {
      console.error(`Error adding document ${item.id} to ${collectionName}:`, error);
    }
  }
}

// Main function to set up all collections
async function setupFirestore() {
  try {
    await setupCollection("bases", basesData);
    await setupCollection("creamers", creamersData);
    await setupCollection("syrups", syrupsData);
    await setupCollection("savedBeverages", []);
    console.log("All collections have been set up successfully");
  } catch (error) {
    console.error("Error setting up collections:", error);
  }
}

// Execute the setup
setupFirestore();

async function addDataToCollection(collectionName: string, data: any) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: temperatures,
    currentTemp: temperatures[0],
    bases: [] as BaseBeverageType[],
    currentBase: null as BaseBeverageType | null,
    syrups: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,
    creamers: [] as CreamerType[],
    currentCreamer: null as CreamerType | null,
    beverages: [] as BeverageType[],
    currentBeverage: null as BeverageType | null,
    currentName: "",
    // Add loading state for better user experience
    isLoading: false,
    error: null as string | null,
    
  }),

  actions: {

    async init() {
      this.isLoading = true;
      this.error = null;
      
      try {
        //Fetch savedBeverages collection from Firestore

        const beverageSnapshot = await getDocs(collection(db, "savedBeverages"));
        this.beverages = beverageSnapshot.docs.map(doc => doc.data() as BeverageType);
        
        // Fetch bases collection from Firestore
        const basesSnapshot = await getDocs(collection(db, "bases"));
        this.bases = basesSnapshot.docs.map(doc => doc.data() as BaseBeverageType);
        
        // Fetch creamers collection from Firestore
        const creamersSnapshot = await getDocs(collection(db, "creamers"));
        this.creamers = creamersSnapshot.docs.map(doc => doc.data() as CreamerType);
        
        // Fetch syrups collection from Firestore
        const syrupsSnapshot = await getDocs(collection(db, "syrups"));
        this.syrups = syrupsSnapshot.docs.map(doc => doc.data() as SyrupType);
        
        // Set default values for current selections
        this.currentBase = this.bases[0]; // Set first base as default
        
        // Find "No Cream" option for default creamer (id: c1)
       //const defaultCreamer = this.creamers.find(creamer => creamer.id === "c1");
        this.currentCreamer = this.creamers[0];
        
        // Find "No Syrup" option for default syrup (id: s1)
        //const defaultSyrup = this.syrups.find(syrup => syrup.id === "s1");
        this.currentSyrup = this.syrups[0];
        
        console.log("Beverage store initialized successfully");
      } catch (error) {
        console.error("Error initializing beverage store:", error);
        this.error = error instanceof Error ? error.message : "Unknown error occurred";
      } finally {
        this.isLoading = false;
      }
    },

    makeBeverage(name: string) {// Create a new beverage recipe from current selections
      const id = this.beverages.length;
      const newBeverage: BeverageType = {
        id: id.toString(),
        name: name,
        temp: this.currentTemp,
        base: this.currentBase || this.bases[0],
        creamer: this.currentCreamer || this.creamers[0],
        syrup: this.currentSyrup || this.syrups[0],
        isIced: this.currentTemp === 'Cold'
      };
      
      // Add it to savedBeverages array
      this.beverages.push(newBeverage);
      addDataToCollection("savedBeverages", newBeverage);
      return newBeverage;
    },

    showBeverage(bevIndex: number) {
      const beverage = this.beverages[bevIndex];
    // Load the selected beverage's settings
      this.currentTemp = beverage.temp;
      this.currentBase = beverage.base;
      this.currentCreamer = beverage.creamer;
      this.currentSyrup = beverage.syrup;
    },
    clearBeverages(){
      this.beverages = [];
    }
  },
  
  persist: true,
});
