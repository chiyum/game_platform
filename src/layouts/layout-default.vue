<script setup lang="ts">
import { useGlobalStore } from "@/store/app-store";
import { storeToRefs } from "pinia";
import { useI18n } from "@/i18n";

const appStore = useGlobalStore();
const { t } = useI18n();
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
    >
      <div class="layout-default-footer-item">
        <q-img class="icon" src="@/assets/images/home/mail_icon.svg" />
        <span>{{ t("pages.home.messages") }}</span>
      </div>
      <div class="layout-default-footer-item">
        <q-img class="icon" src="@/assets/images/home/gift_icon.svg" />
        <span>{{ t("pages.home.gift") }}</span>
      </div>
      <div class="layout-default-footer-item layout-default-footer-item-middle">
        <q-img class="icon" src="@/assets/images/home/footer_coin.svg" />
        <q-img class="icon-str" src="@/assets/images/home/footer_str.png" />
      </div>
      <div class="layout-default-footer-item">
        <q-img class="icon" src="@/assets/images/home/bingo_icon.svg" />
        <span>{{ t("pages.home.award") }}</span>
      </div>
      <div class="layout-default-footer-item">
        <q-img class="icon" src="@/assets/images/home/vip_icon.svg" />
        <span>{{ t("pages.home.vip") }}</span>
      </div>
    </div>
    <div class="layout-default-bg"></div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/home.scss";
</style>
