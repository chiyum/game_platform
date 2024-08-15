// useImagePreloader.ts

import { ref } from "vue";
import { ImagePreloader, ProgressTracker, ImageLoader } from "@/types/global";
import {
  DefaultImageLoader,
  DefaultProgressTracker,
  DefaultImagePreloader
} from "@/utils/class";

export function useImagePreloader(imageSources: string[]) {
  const progressTracker: ProgressTracker = new DefaultProgressTracker();
  const imageLoader: ImageLoader = new DefaultImageLoader();
  const imagePreloader: ImagePreloader = new DefaultImagePreloader(
    imageLoader,
    progressTracker
  );

  const progress = ref(0);

  const init = async () => {
    await imagePreloader.preloadImages(imageSources);
    updateProgress();
  };

  init();
  /**
   * 使用onMounted的原因為:
   * 在元件實例創建之前執行的代碼可能會導致一些意外的副作用或錯誤，尤其是在服務器端渲染（SSR）的情況下
   * ex: 速度太慢先封存
   */
  // onMounted(async () => {
  //   await imagePreloader.preloadImages(imageSources);
  //   updateProgress();
  // });

  function updateProgress() {
    progress.value = progressTracker.getProgress();
  }

  return {
    progress,
    isImageLoaded: (src: string) => imagePreloader.isImageLoaded(src)
  };
}
