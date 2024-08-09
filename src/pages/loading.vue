<script setup lang="ts">
import { useImagePreloader } from "@/composable/imagePreload";
import { getImageUrl } from "@/utils/getImageUrl";
defineOptions({
  layout: "layout-loading"
});

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
  <div>{{ progress }}</div>
</template>

<style lang="scss" scoped>
.home-card {
  margin: 20px;
  width: 300px;
}
</style>
