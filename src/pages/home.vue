<script setup lang="ts">
import { useGlobalStore } from "@/store/app-store";
import TypeBar from "@/components/home/type-bar.vue";
import Game from "@/components/home/game.vue";
import Banner from "@/components/home/banner.vue";
import SettingDialog from "@/components/home/setting-dialog.vue";

defineOptions({
  layout: "layout-default"
});

interface State {
  isShowSettingDialog: boolean;
}

const state: State = reactive({
  isShowSettingDialog: true
});
// const { t } = useI18n();
const appStore = useGlobalStore();
// const router = useRouter();

onBeforeRouteLeave((to, from, next) => {
  const animationTime = 200;
  appStore.setLayoutLeaveAnimation(true);
  setTimeout(() => {
    next();
    appStore.setLayoutLeaveAnimation(false);
  }, animationTime);
});
</script>

<template>
  <div class="home">
    <TypeBar />
    <Game />
    <Banner />
    <SettingDialog v-model="state.isShowSettingDialog" />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>
