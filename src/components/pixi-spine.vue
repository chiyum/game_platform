<template>
  <div ref="pixiContainer" class="pixi-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import { Assets } from "pixi.js";

const pixiContainer = ref<HTMLDivElement | null>(null);

// 設定基礎路徑
const basePath = "/game_platform";

// 設定資源路徑
const resources = {
  atlas: `${basePath}/02.atlas`,
  image: `${basePath}/02.webp`,
  json: `${basePath}/02.json`
};

onMounted(async () => {
  if (!pixiContainer.value) return;

  // 創建 PIXI Application
  const app = new PIXI.Application({
    resizeTo: pixiContainer.value,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
    backgroundColor: 0x000000,
    backgroundAlpha: 0
  });

  // 將 PIXI canvas 添加到 DOM
  pixiContainer.value.appendChild(app.view as HTMLCanvasElement);

  try {
    // 加載資源
    await Assets.load([
      {
        alias: "spineData",
        src: resources.json
      },
      {
        alias: "spineAtlas",
        src: resources.atlas
      },
      {
        alias: "spineImage",
        src: resources.image
      }
    ]);

    // 獲取加載的資源
    const spineData = Assets.get("spineData");

    // 創建 Spine 實例
    const animation = new Spine(spineData.spineData);
    animation.state.timeScale = 1;

    // 設置動畫位置
    animation.x = app.screen.width / 2;
    animation.y = app.screen.height / 1.5;

    // 設置動畫比例
    animation.scale.set(0.15);

    // 添加動畫到舞台
    app.stage.addChild(animation);

    // 獲取可用的動畫名稱
    const animationNames = animation.spineData.animations.map(
      (anim) => anim.name
    );
    console.log("Available animations:", animationNames);

    // 播放第一個可用的動畫
    if (animationNames.length > 0) {
      animation.state.setAnimation(0, animationNames[0], true);
    } else {
      console.error("No animations found in the spine data");
    }
  } catch (error) {
    console.error("Failed to load spine resources:", error);
  }
});
</script>

<style lang="scss" scoped>
.pixi-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
