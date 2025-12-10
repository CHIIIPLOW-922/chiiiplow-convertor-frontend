<template>
    <!-- <n-switch class="w-[48px]" v-model:value="isDark">
        <template #unchecked>
            <n-icon size="15" :depth="2" :component="Sunny">
            </n-icon>
        </template>

        <template #checked>
            <n-icon size="15" :depth="2" :component="Moon">
            </n-icon>
        </template>
    </n-switch> -->
    <n-button v-model:value="isDark" @click="changeThemeLoading()" circle quaternary size="large">
        <template #icon>
            <n-icon v-if="isDark" size="15" :depth="2" :component="Moon"></n-icon>
            <n-icon v-else size="15" :depth="2" :component="Sunny"></n-icon>
        </template>
    </n-button>
</template>

<script setup>
import { useDarkTheme } from '@/utils/useDarkTheme';
import { Moon, Sunny } from '@vicons/ionicons5';
import { useLoadingBar } from 'naive-ui';
const loadingBar = useLoadingBar()
const { isDark } = useDarkTheme()
const changeThemeLoading = () => {
    isDark.value = !isDark.value
    loadingBar.start()
    setTimeout(() => {
        loadingBar.finish()
    }, 300)
}


</script>

<style lang="scss">
.theme-switch {}
</style>