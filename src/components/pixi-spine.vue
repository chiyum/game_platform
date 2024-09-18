<template>
  <div ref="pixiContainer" class="pixi-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import { Assets } from "pixi.js";
import pixiAtlas from "@/assets/animation/02.atlas";

const pixiContainer = ref<HTMLDivElement | null>(null);

onMounted(async () => {
  if (!pixiContainer.value) return;

  // 創建 PIXI Application
  const app = new PIXI.Application({
    resizeTo: pixiContainer.value, // Automatically resize to the container
    autoDensity: true, // Adjust for device pixel ratio
    resolution: window.devicePixelRatio || 1,
    backgroundColor: 0x000000, // 設置背景顏色
    backgroundAlpha: 0 // 設置背景完全透明
  });

  // 將 PIXI canvas 添加到 DOM
  pixiContainer.value.appendChild(app.view as HTMLCanvasElement);

  try {
    // 加載資源
    await Assets.load([
      {
        alias: "spineData",
        src: new URL("../assets/animation/02.json", import.meta.url).href
      },
      {
        alias: "spineAtlas",
        src: new URL("../assets/animation/02.atlas", import.meta.url).href
      },
      {
        alias: "spineImage",
        src: pixiAtlas
      }
    ]);

    // 獲取加載的資源
    const spineData = Assets.get("spineData");

    // 創建 Spine 實例
    const animation = new Spine(spineData.spineData);
    animation.state.timeScale = 1; // 根据需要调整此值
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
