import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";
import tempretures from "../data/tempretures.json";
import db from "../firebase.ts";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

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
    temps: tempretures,
    currentTemp: tempretures[0],
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
    makeBeverage(bevName: string) {
      const id = this.beverages.length;
      const newBeverage: BeverageType = {
        id: id.toString(),
        name: bevName,
        temp: this.currentTemp,
        base: this.currentBase || this.bases[0],
        creamer: this.currentCreamer || this.creamers[0],
        syrup: this.currentSyrup || this.syrups[0],
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
  },
});
