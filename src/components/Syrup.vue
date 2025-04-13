<template>
  <div class="syrup" ></div>
</template>
  
<script setup lang="ts">

type Props = {
  syrupClass: string;
};
defineProps<Props>();

import { SyrupType } from "../types/beverage";

</script>
<style lang="scss" scoped>
.syrup {
  visibility: visible;
  transform: translateY(400%);
  background-color: #c6c6c6;
  position: relative;
  width: 100%;
  height: 20%;
  animation: pour-tea 2s 1s forwards;
  z-index: 2;
}

/*no syrup*/
.s1 {
  visibility: hidden;
}
/*vanilla*/
.s2 {
  visibility: visible;
  background-color: #FFEFD5
}
/*caramel*/
.s3 {
  visibility: visible;
  background-color: #DAA520
}
/*hazelnut*/
.s4 {
  visibility: visible;
  background-color: #6B4423
}

/*black tea*/
.b1 {
  visibility: visible;
  background-color: #8B4513;
}
/*green tea*/
.b2 {
  visibility: visible;
  background-color: #C8E6C9;
}
/*coffee*/
.b3 {
  visibility: visible;
  background-color: #6F4E37;
}
</style>
