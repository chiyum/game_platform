<script setup lang="ts">
import i18n from "@/i18n";
const { t } = i18n;
</script>

<template>
  <div class="layout-loading">
    <slot />
    <div class="layout-loading-text">
      {{ t("global.loading.bottom.text") }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/loading.scss";
</style>
