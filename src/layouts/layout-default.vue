<script setup lang="ts"></script>

<template>
  <div class="layout-default">
    <div class="layout-default-header"></div>
    <div class="layout-default-main">
      <slot />
    </div>
    <div class="layout-default-footer"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>
