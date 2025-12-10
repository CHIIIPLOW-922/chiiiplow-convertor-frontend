<template>
  <div id="app">
    <n-config-provider :locale="enUS" :theme="isDark ? darkTheme : null" :theme-overrides="themeOverrides">
      <n-message-provider>
        <n-dialog-provider>
          <RouterView />
        </n-dialog-provider>
      </n-message-provider>
    </n-config-provider>
  </div>
</template>



<script setup>
import { enUS, darkTheme } from 'naive-ui';
import { useDarkTheme } from '@/utils/useDarkTheme';
import { customColorTheme } from '@/utils/customColorTheme';
const { isDark } = useDarkTheme();
const { themeOverrides } = customColorTheme()
</script>

<style>
/* 全局重置样式 */
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
  /* 浅灰背景，更有质感 */
}
</style>
