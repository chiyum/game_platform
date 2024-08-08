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

  function setLayoutLeaveAnimation(isLeave: boolean) {
    layoutLeaveAnimation.value.startLeave = isLeave;
  }

  return {
    lang,
    layoutLeaveAnimation,
    setLayoutLeaveAnimation
  };
});
