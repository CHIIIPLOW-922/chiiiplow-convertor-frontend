<template>
    <n-switch class="w-[40px] h-[40px]" v-model:value="isDark" size="large">
        <template #unchecked>
            <n-icon size="13" :depth="2" :component="Sunny">
            </n-icon>
        </template>

        <template #checked>
            <n-icon size="13" :depth="2" :component="Moon">
            </n-icon>
        </template>
    </n-switch>
</template>

<script setup>
import { useDarkTheme } from '@/utils/useDarkTheme'
import { Sunny, Moon } from '@vicons/ionicons5'
const { isDark } = useDarkTheme()

</script>

<style lang="scss">
.theme-switch {}
</style>