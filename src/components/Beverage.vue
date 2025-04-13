<template>
  <Mug>
    <Cold v-if="isIced" />
    <Hot v-else />
    <Contents>
      <template v-slot:top>
        <Creamer v-if="creamClass !== 'c1'" :creamClass="creamClass" />
      </template>
      <template v-slot:mid>
        <Syrup v-if="syrupClass !== 's1'" :syrupClass="syrupClass" />
        <Syrup v-else :syrupClass="baseClass" />
      </template>
      <template v-slot:bottom>
        <Base :baseClass="baseClass"/>
      </template>
    </Contents>
  </Mug>
</template>
<script setup lang="ts">
import Contents from "./Contents.vue";
import Mug from "./Mug.vue";
import Syrup from "./Syrup.vue";
import Base from "./Base.vue";
import Creamer from "./Creamer.vue";
import Hot from "./Hot.vue";
import Cold from "./Cold.vue";

type Props = {
  isIced: boolean;
  baseClass: string;
  syrupClass: string;
  creamClass: string;
};
defineProps<Props>();

</script>
