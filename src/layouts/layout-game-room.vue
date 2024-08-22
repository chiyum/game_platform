<script setup lang="ts"></script>

<template>
  <div class="layout-game-room">
    <div class="layout-game-room-header">
      <div class="layout-game-room-header-right-btn">
        <span>2x</span>
        <span>SALE</span>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/game-room.scss";
</style>
