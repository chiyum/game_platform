<script setup lang="ts">
import { useGlobalStore } from "@/store/app-store";

defineOptions({
  layout: "layout-default"
});

const { t } = useI18n();
const appStore = useGlobalStore();
const router = useRouter();

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
  <div>
    <q-btn
      class="home-card"
      color="primary"
      :label="t('login')"
      @click="() => router.push('/login')"
    >
    </q-btn>
  </div>
</template>

<style lang="scss" scoped>
.home-card {
  margin: 20px;
  width: 300px;
}
</style>
