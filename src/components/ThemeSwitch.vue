<template>
    <n-switch class="w-[46px]" v-model:value="isDark">
        <template #unchecked>
            <n-icon size="15" :depth="2" :component="Sunny">
            </n-icon>
        </template>

        <template #checked>
            <n-icon size="15" :depth="2" :component="Moon">
            </n-icon>
        </template>
    </n-switch>
</template>

<script setup>
import { useDarkTheme } from '@/utils/useDarkTheme';
import { Moon, Sunny } from '@vicons/ionicons5';
const { isDark } = useDarkTheme()

</script>

<style lang="scss">
.theme-switch {}
</style>