<template>
  <div id="app">
    <n-config-provider :locale="enUS" :theme="isDark ? darkTheme : null" :theme-overrides="themeOverrides">
      <n-loading-bar-provider>
        <n-message-provider>
          <n-dialog-provider>
            <RouterView />
          </n-dialog-provider>
        </n-message-provider>
      </n-loading-bar-provider>
    </n-config-provider>
  </div>
</template>



<script setup>
import { customColorTheme } from '@/utils/customColorTheme';
import { useDarkTheme } from '@/utils/useDarkTheme';
import { darkTheme, enUS } from 'naive-ui';
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
  /* 浅灰背景，更有质感 */
}
</style>
