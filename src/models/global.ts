// implementations.ts

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
