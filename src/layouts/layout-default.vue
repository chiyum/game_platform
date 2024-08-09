<script setup lang="ts">
import { useGlobalStore } from "@/store/app-store";
import { storeToRefs } from "pinia";

const appStore = useGlobalStore();
const { layoutLeaveAnimation } = storeToRefs(appStore);

const isAnimation = computed(() => layoutLeaveAnimation.value.startLeave);
</script>

<template>
  <div class="layout-default">
    <div
      class="layout-default-header"
      :class="['animated-header', { 'animated-header--leave': isAnimation }]"
    ></div>
    <div class="layout-default-main">
      <slot />
    </div>
    <div
      class="layout-default-footer"
      :class="['animated-footer', { 'animated-footer--leave': isAnimation }]"
    ></div>
    <div class="layout-default-bg"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>
