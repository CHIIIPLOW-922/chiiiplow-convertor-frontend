<template>
    <n-switch v-model:value="isDark" />
</template>

<script setup>
import { useTheme } from '@/utils/useTheme'

const { isDark } = useTheme()

</script>

<style lang="scss">
.theme-switch {}
</style>