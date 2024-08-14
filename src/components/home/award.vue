<script setup lang="ts">
import { useI18n } from "@/i18n";
const { t } = useI18n();
</script>

<template>
  <div class="award">
    <div class="award-header">
      {{ t("pages.home.award.take") }}
    </div>
    <div class="award-main"></div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/award.scss";
</style>
