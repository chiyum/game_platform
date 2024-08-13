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
  options: { label: string; value: string; icon: string }[];
  isShowSelect: boolean;
}
const state: State = reactive({
  selectType: "all",
  originList: FACK_GAME_LIST,
  showList: computed(() => {
    if (state.selectType === "all") return state.originList;
    return state.originList.filter((item) => item.type === state.selectType);
  }),
  options: [
    { label: "all", value: "all", icon: "type_bar_icon.svg" },
    { label: "record", value: "record", icon: "record.svg" },
    { label: "favorite", value: "favorite", icon: "record.svg" }
  ],
  isShowSelect: false
});

const changeSelectType = (type: string) => {
  state.selectType = type;
};
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
        <q-icon>
          <q-img src="@/assets/images/home/type_bar_icon.svg" alt="" />
        </q-icon>
        <span>{{ t(`pages.home.all`) }}</span>
      </div>
      <q-btn class="type-bar-select-arrow">
        <q-img
          src="@/assets/images/home/type_bar_arrow.svg"
          :class="{ 'q-img--down': state.isShowSelect }"
        />
        <q-menu class="type-bar-select-options">
          <q-list style="min-width: 2.1rem">
            <q-item
              v-for="option in state.options"
              :key="option.value"
              :class="{ 'q-item--active': state.selectType === option.value }"
              @click="changeSelectType(option.value)"
              clickable
            >
              <q-item-section>
                <q-icon style="width: 0.35rem">
                  <q-img :src="getImageUrl(`home/${option.icon}`)" alt="icon" />
                </q-icon>
                <span>
                  {{ t(`pages.home.${option.label}`) }}
                </span>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/home.scss";
</style>
