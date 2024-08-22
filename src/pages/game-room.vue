<template>
  <div id="responsive-container" ref="container">
    <div id="responsive-content" :style="contentStyle">
      <div class="title">響應式標題</div>
      <div class="subtitle">這是一個副標題</div>
      <button class="button">點擊我</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 762;
const ASPECT_RATIO = DESIGN_WIDTH / DESIGN_HEIGHT;

const container = ref(null);
const scale = ref(1);
const contentWidth = ref(DESIGN_WIDTH);

const contentStyle = computed(() => ({
  transform: `scale(${scale.value})`,
  width: `${contentWidth.value}px`,
  height: `${DESIGN_HEIGHT}px`,
  transformOrigin: "center"
}));

const calculateScale = () => {
  if (!container.value) return;
  console.log("calculateScale()");
  const containerWidth = container.value.clientWidth;
  const containerHeight = container.value.clientHeight;

  if (containerWidth / containerHeight > ASPECT_RATIO) {
    // 容器太寬，以高度為基準
    scale.value = containerHeight / DESIGN_HEIGHT;
    contentWidth.value = containerHeight * ASPECT_RATIO;
  } else {
    // 容器太高，以寬度為基準
    scale.value = containerWidth / DESIGN_WIDTH;
    contentWidth.value = DESIGN_WIDTH;
  }
};

const handleResize = () => {
  calculateScale();
};

onMounted(() => {
  calculateScale();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
#responsive-container {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  overflow: hidden;
}

#responsive-content {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 24px;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 18px;
  margin-bottom: 24px;
}

.button {
  font-size: 16px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
