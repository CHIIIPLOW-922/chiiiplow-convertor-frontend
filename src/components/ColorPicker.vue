<template>
    <n-color-picker class="w-[40px] h-[40px]" v-model:value="primaryColor" :modes="['hex']"></n-color-picker>
</template>

<script setup>
import { customColorTheme } from '@/utils/customColorTheme';
const { primaryColor } = customColorTheme()


</script>

<style lang="scss">
.n-color-picker .n-color-picker-trigger__value {
    display: none !important;
}
</style>