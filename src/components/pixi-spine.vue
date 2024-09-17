<template>
  <div ref="pixiContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import { Assets } from "pixi.js";

const pixiContainer = ref<HTMLDivElement | null>(null);

onMounted(async () => {
  if (!pixiContainer.value) return;

  // 創建 PIXI Application
  const app = new PIXI.Application({
    width: 800,
    height: 600
  });

  // 將 PIXI canvas 添加到 DOM
  pixiContainer.value.appendChild(app.view as HTMLCanvasElement);

  try {
    // 加載資源
    await Assets.load([
      { alias: "spineData", src: "src/assets/animation/01.json" },
      { alias: "spineAtlas", src: "src/assets/animation/01.atlas" },
      { alias: "spineImage", src: "src/assets/animation/01.png" }
    ]);

    // 獲取加載的資源
    const spineData = Assets.get("spineData");

    // 創建 Spine 實例
    const animation = new Spine(spineData.spineData);

    // 設置動畫位置
    animation.x = app.screen.width / 2;
    animation.y = app.screen.height;

    // 設置動畫比例
    animation.scale.set(0.5);

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
