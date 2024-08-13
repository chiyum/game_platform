<script setup lang="ts">
import { GameObject } from "@/models/game";
import { FACK_GAME_LIST } from "@/contants/game";
import getImageUrl from "@/utils/getImageUrl";
import { useI18n } from "@/i18n";

const { t } = useI18n();

interface State {
  selectType: string;
  originList: GameObject[];
  showList: GameObject[];
}
const state: State = reactive({
  selectType: "all",
  originList: FACK_GAME_LIST,
  showList: computed(() => {
    if (state.selectType === "all") return state.originList;
    return state.originList.filter((item) => item.type === state.selectType);
  })
});
</script>

<template>
  <div class="type-bar">
    <div class="type-bar-list scrollable-content">
      <div class="type-bar-item" v-for="item in state.showList" :key="item.src">
        <q-img :src="getImageUrl(`home/${item.src}`)" />
      </div>
    </div>
    <div class="type-bar-select">
      <div class="type-bar-select-selected">
        <img src="@/assets/images/home/type_bar_icon.svg" alt="" />
        <span>{{ t(`pages.home.all`) }}</span>
      </div>
      <div class="type-bar-select-arrow">
        <q-img src="@/assets/images/home/type_bar_arrow.svg" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/home.scss";
</style>
