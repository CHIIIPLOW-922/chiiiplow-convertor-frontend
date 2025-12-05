<template>
  <div id="app">
    <n-config-provider :locale="enUS" :theme-overrides="themeOverrides">
      <n-message-provider>
        <n-dialog-provider>
          <RouterView />
        </n-dialog-provider>
      </n-message-provider>
    </n-config-provider>
  </div>
</template>



<script setup>
import { enUS } from 'naive-ui';
const themeOverrides = {
  common: {
    primaryColor: '#5882FA',        // ✅ 主色（亚马逊橙）
    primaryColorHover: '#ffad33',
    primaryColorPressed: '#e68a00',
    primaryColorSuppl: '#ff9900'
  }
}
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
