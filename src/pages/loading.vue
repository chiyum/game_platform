<script setup lang="ts">
import { useImagePreloader } from "@/composable/imagePreload";
import { useMultiProgress } from "@/composable/mutiProgressTracker";
import { getImageUrl } from "@/utils/getImageUrl";
import { useI18n } from "@/i18n";
// import CountUp from "vue-countup-v3";
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

const { t } = useI18n();
const router = useRouter();
const { progress: imageProgress } = useImagePreloader(imagesToPreload);
const { addSource, updateProgress, totalProgress } = useMultiProgress();

// 添加圖片預加載進度源
addSource("imagePreloader", 1);

// 添加另一個進度源
addSource("pendingProgress", 1);

/** 為了進度條可以讓使用者看到正常跑動，而不是載入太快一下就跳轉顯得太突兀，加入了pending功能 */
watch(imageProgress, (value) => {
  updateProgress("imagePreloader", value);
  if (value === 100) {
    updateProgress("pendingProgress", 10);
    setTimeout(() => {
      updateProgress("pendingProgress", 100);
    }, 500);
  }
});

/** 載入完成前往登入頁面 */
watch(totalProgress, (value) => {
  if (value === 100) {
    router.push("/login");
  }
});
</script>

<template>
  <div class="loading-bar-wrap">
    <div class="loading-bar">
      <span class="loading-bar-text">
        {{ t("global.loading") }}
      </span>
      <div class="loading-bar-progress" :style="{ width: `${totalProgress}%` }">
        <!--        <count-up :end-val="progress"></count-up>-->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/loading.scss";
</style>
