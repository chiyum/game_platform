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
  const layoutDefaultMask = ref<boolean>(false);
  const pwaState = ref({
    show: false,
    deferredPrompt: null
  });

  function setLayoutLeaveAnimation(isLeave: boolean) {
    layoutLeaveAnimation.value.startLeave = isLeave;
  }

  function setProgress(value: number) {
    progress.value = value;
  }

  function setLayoutDefaultMask(value: boolean) {
    layoutDefaultMask.value = value;
  }

  function setPwaState(value: boolean, deferredPrompt: any) {
    pwaState.value.show = value;
    pwaState.value.deferredPrompt = deferredPrompt;
  }

  return {
    lang,
    pwaState,
    progress,
    layoutDefaultMask,
    layoutLeaveAnimation,
    setProgress,
    setLayoutDefaultMask,
    setPwaState,
    setLayoutLeaveAnimation
  };
});
