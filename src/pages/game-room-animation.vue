<script setup lang="ts">
import { useGlobalStore } from "@/store/app-store";
import pixiSpine from "@/components/pixi-spine.vue";
import * as PIXI from "pixi.js";
import altas from "@/assets/animation/01.atlas";
import json from "@/assets/animation/01.json";
import images from "@/assets/animation/01.png";

defineOptions({
  layout: "layout-game-room"
});
const appStore = useGlobalStore();

const spineResources = {
  atlasPath: altas,
  imagePath: images,
  jsonPath: json
};

let pixiApp: PIXI.Application | null = null;

onMounted(() => {
  pixiApp = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb
  });
  provide("pixiApp", pixiApp);
});

onUnmounted(() => {
  if (pixiApp) {
    pixiApp.destroy();
  }
});

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
  <div class="game-room-animation">
    <pixi-spine
      :resources="spineResources"
      initialAnimation="idle"
      :scale="0.5"
    />
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/game-room.scss";
</style>
