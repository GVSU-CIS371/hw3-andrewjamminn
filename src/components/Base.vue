<template>
  <div :class="['baseBeverage']"></div>
</template>

<script setup lang="ts">

type Props = {
  baseClass: string | null;
};
defineProps<Props>();

</script>

<style scoped>
.baseBeverage {
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 0;
  animation: pour-tea 2s;
  z-index: 300;
  background-color: v-bind(baseClass);
}

/*black tea*/
.b1 {
  background-color: #8B4513;
}
/*green tea*/
.b2 {
  background-color: #C8E6C9;
}
/*coffee*/
.b3 {
  background-color: #6F4E37;
}

</style>
