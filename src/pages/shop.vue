<script setup lang="ts">
import Progress from "@/components/progress.vue";
import { useI18n } from "@/i18n";

defineOptions({
  layout: "layout-shop"
});

const { t } = useI18n();

interface State {
  amount: number;
  tip: string;
  level: number;
}

const state: State = reactive({
  amount: 450,
  tip: "",
  level: 2
});

const init = (): void => {
  state.tip = t("pages.shop.vip.up.Level", { level: state.level });
};
init();
</script>

<template>
  <div class="shop">
    <div class="shop-header">
      <div class="shop-header-banner">
        <div class="shop-header-banner-left">
          <span>SHOP</span>
        </div>
        <div class="shop-header-banner-right"></div>
      </div>
      <div class="shop-header-info">
        <div class="shop-header-info-left">
          <div>VIP BOUNS</div>
          <div>{{ t("pages.shop.double.points") }}</div>
        </div>
        <div class="shop-header-info-middle">
          <div class="shop-header-info-level">
            {{ state.level }}
          </div>
        </div>
        <div class="shop-header-info-right">
          <Progress :progress="50" :height="0.3" height-unit="rem" />
          <div class="shop-header-info-amount">{{ state.amount }}</div>
          <div class="shop-header-info-tip">{{ state.tip }}</div>
        </div>
      </div>
    </div>
    <div class="shop-main"></div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/shop.scss";
</style>
