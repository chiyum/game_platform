import { ref, computed, Ref } from "vue";

import { ImageLoader, ProgressTracker, ImagePreloader } from "@/types/global";

export class DefaultImageLoader implements ImageLoader {
  load(src: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = src;
    });
  }
}

export class DefaultProgressTracker implements ProgressTracker {
  private progress = 0;

  updateProgress(loaded: number, total: number): void {
    this.progress = Math.round((loaded / total) * 100);
  }

  getProgress(): number {
    return this.progress;
  }
}

export class DefaultImagePreloader implements ImagePreloader {
  private loadedImages: Record<string, boolean> = {};
  private imageLoader: ImageLoader;
  private progressTracker: ProgressTracker;

  constructor(imageLoader: ImageLoader, progressTracker: ProgressTracker) {
    this.imageLoader = imageLoader;
    this.progressTracker = progressTracker;
  }

  async preloadImages(sources: string[]): Promise<void> {
    const total = sources.length;
    let loaded = 0;

    for (const src of sources) {
      try {
        const isLoaded = await this.imageLoader.load(src);
        this.loadedImages[src] = isLoaded;
      } catch {
        this.loadedImages[src] = false;
      }
      loaded++;
      this.progressTracker.updateProgress(loaded, total);
    }
  }

  isImageLoaded(src: string): boolean {
    return this.loadedImages[src] || false;
  }
}

/** 多個進度條載入 NOTE:搭載Vue */

export class MultiProgressTracker {
  private sources: Map<string, { progress: number; weight: number }> =
    new Map();
  private totalWeight: number = 0; // 權重
  private progressRef: Ref<number> = ref(0);

  addSource(name: string, weight: number = 1) {
    this.sources.set(name, { progress: 0, weight });
    this.totalWeight += weight;
  }

  updateProgress(name: string, progress: number) {
    const source = this.sources.get(name);
    if (source) {
      source.progress = progress;
      this.recalculateTotalProgress();
    }
  }

  private recalculateTotalProgress() {
    let totalProgress = 0;
    for (const [, { progress, weight }] of this.sources) {
      totalProgress += (progress * weight) / this.totalWeight;
    }
    this.progressRef.value = Math.round(totalProgress);
  }

  getTotalProgress(): Ref<number> {
    return computed(() => this.progressRef.value);
  }
}
