/* eslint-disable no-unused-vars */
export declare interface ImageLoader {
  load(src: string): Promise<boolean>;
}

export declare interface ProgressTracker {
  updateProgress(loaded: number, total: number): void;
  getProgress(): number;
}

export declare interface ImagePreloader {
  preloadImages(sources: string[]): Promise<void>;

  isImageLoaded(src: string): boolean;
}
