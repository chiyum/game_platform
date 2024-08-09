// useImagePreloader.ts

import { ref, onMounted } from "vue";
import { ImagePreloader, ProgressTracker, ImageLoader } from "@/types/global";
import {
  DefaultImageLoader,
  DefaultProgressTracker,
  DefaultImagePreloader
} from "@/models/global";

export function useImagePreloader(imageSources: string[]) {
  const progressTracker: ProgressTracker = new DefaultProgressTracker();
  const imageLoader: ImageLoader = new DefaultImageLoader();
  const imagePreloader: ImagePreloader = new DefaultImagePreloader(
    imageLoader,
    progressTracker
  );

  const progress = ref(0);

  /**
   * 使用onMounted的原因為:
   * 在元件實例創建之前執行的代碼可能會導致一些意外的副作用或錯誤，尤其是在服務器端渲染（SSR）的情況下
   */
  onMounted(async () => {
    await imagePreloader.preloadImages(imageSources);
    updateProgress();
  });

  function updateProgress() {
    progress.value = progressTracker.getProgress();
  }

  return {
    progress,
    isImageLoaded: (src: string) => imagePreloader.isImageLoaded(src)
  };
}
