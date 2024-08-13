import { defineStore } from "pinia";
import { ref } from "vue";

interface LayoutLeaveAnimation {
  startLeave: boolean;
  mode: string | null;
}

export const useGlobalStore = defineStore("useGlobalStore", () => {
  const lang = ref<string>("zh-CN");
  const layoutLeaveAnimation = ref<LayoutLeaveAnimation>({
    startLeave: false,
    mode: null
  });
  const progress = ref<number>(0);

  function setLayoutLeaveAnimation(isLeave: boolean) {
    layoutLeaveAnimation.value.startLeave = isLeave;
  }

  function setProgress(value: number) {
    progress.value = value;
  }

  return {
    lang,
    progress,
    layoutLeaveAnimation,
    setProgress,
    setLayoutLeaveAnimation
  };
});
