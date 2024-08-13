<script setup lang="ts">
import { useGlobalStore } from "@/store/app-store";
import TypeBar from "@/components/home/type-bar.vue";
import Game from "@/components/home/game.vue";
import Banner from "@/components/home/banner.vue";

defineOptions({
  layout: "layout-default"
});

// const { t } = useI18n();
const appStore = useGlobalStore();
// const router = useRouter();

onBeforeRouteLeave((to, from, next) => {
  const animationTime = 200;
  appStore.setLayoutLeaveAnimation(true);
  setTimeout(() => {
    next();
    appStore.setLayoutLeaveAnimation(false);
  }, animationTime);
});
</script>

<template>
  <div class="home">
    <TypeBar />
    <Game />
    <Banner />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>
