<script setup lang="ts">
import { useImagePreloader } from "@/composable/imagePreload";
import { getImageUrl } from "@/utils/getImageUrl";
import { useI18n } from "@/i18n";
// import CountUp from "vue-countup-v3";
defineOptions({
  layout: "layout-loading"
});

const { t } = useI18n();

const imagesToPreload = [
  getImageUrl("home/gift_icon.png"),
  getImageUrl("home/slot_btn.png"),
  getImageUrl("home/poker_btn.png"),
  getImageUrl("home/mail_icon.png"),
  getImageUrl("home/profile_img.png"),
  getImageUrl("default_background.png"),
  getImageUrl("downbar_nolight_bg.png"),
  getImageUrl("topbar_bg.png")
  // ... 添加更多图片
];

const { progress } = useImagePreloader(imagesToPreload);
</script>

<template>
  <div class="loading-bar-wrap">
    <div class="loading-bar">
      <span class="loading-bar-text">
        {{ t("global.loading") }}
      </span>
      <div class="loading-bar-progress" :style="{ width: `${progress}%` }">
        <!--        <count-up :end-val="progress"></count-up>-->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/loading.scss";
</style>
