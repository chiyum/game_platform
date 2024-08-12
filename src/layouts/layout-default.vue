<script setup lang="ts">
import { useGlobalStore } from "@/store/app-store";
import { storeToRefs } from "pinia";

const appStore = useGlobalStore();
const { layoutLeaveAnimation } = storeToRefs(appStore);

interface State {
  amount: number;
  level: number;
  gem: number;
}

const state: State = reactive({
  amount: 11900000,
  level: 3,
  gem: 1000
});

const isAnimation = computed(() => layoutLeaveAnimation.value.startLeave);
</script>

<template>
  <div class="layout-default">
    <div
      class="layout-default-header"
      :class="['animated-header', { 'animated-header--leave': isAnimation }]"
    >
      <q-avatar size="1rem">
        <q-img src="@/assets/images/home/profile_img.png" />
      </q-avatar>
      <div class="layout-default-header-data">
        <div class="layout-default-header-data-amount">
          <div class="layout-default-header-data-amount-text">
            {{ new Intl.NumberFormat().format(state.amount) }}
          </div>
        </div>
        <div class="layout-default-header-data-setting">
          <div>
            <span class="layout-default-header-data-setting-text">
              {{ `Lv ${state.level}` }}
            </span>
          </div>
          <div>
            <span class="layout-default-header-data-setting-text">
              {{ new Intl.NumberFormat().format(state.gem) }}
            </span>
          </div>
        </div>
      </div>
      <div class="layout-default-icon">
        <q-img class="piggy-bank" src="@/assets/images/home/piggy_bank.svg" />
      </div>
      <div class="layout-default-icon">
        <q-img src="@/assets/images/home/buy.svg" class="buy"></q-img>
      </div>
    </div>
    <div class="layout-default-main">
      <slot />
    </div>
    <div
      class="layout-default-footer"
      :class="['animated-footer', { 'animated-footer--leave': isAnimation }]"
    ></div>
    <div class="layout-default-bg"></div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/home.scss";
</style>
