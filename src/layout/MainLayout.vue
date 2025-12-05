<template>
    <div class="main-layout flex h-screen flex-col md:flex-row">
        <!-- PC端侧边栏 (手机隐藏) -->
        <div class="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
            <div class="h-16 flex items-center justify-center font-bold text-xl text-green-600 border-b">
                Convertor
            </div>
            <div class="p-4">PC 菜单区</div>
        </div>

        <!-- 移动端顶部栏 (PC隐藏) -->
        <div class="md:hidden h-14 bg-white border-b flex items-center px-4 justify-between">
            <div class="font-bold">Convertor</div>
            <n-button>菜单</n-button>
        </div>

        <!-- 内容区域 -->
        <div class="flex-1 overflow-auto p-4">
            <router-view />
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss">
.main-layout {
}
</style>