<template>
    <n-button 
        class="w-[45px] h-[45px]" 
        @click="changeThemeLoading($event)" 
        text
    >
        <template #icon>
            <n-icon v-if="isDark" size="24" :depth="1" :component="Moon"></n-icon>
            <n-icon v-else size="24" :depth="1" :component="Sunny"></n-icon>
        </template>
    </n-button>
</template>

<script setup>
import { nextTick } from 'vue';
import { useDarkTheme } from '@/utils/useDarkTheme';
import { Moon, Sunny } from '@vicons/ionicons5';
import { useLoadingBar } from 'naive-ui';

const loadingBar = useLoadingBar()
const { isDark } = useDarkTheme()

const changeThemeLoading = (event) => {
    // 1. 浏览器兼容性检查
    if (!document.startViewTransition) {
        isDark.value = !isDark.value;
        return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
    );

    // 判断接下来的状态：是变黑还是变亮？
    const isGoingToDark = !isDark.value;

    // 核心逻辑：如果是 "明 -> 暗"，我们需要加上一个类名来控制 CSS 层级
    // 同时也通过这个变量控制动画是 0->Max 还是 Max->0
    if (isGoingToDark) {
        document.documentElement.classList.add('dark-transition');
    }

    const transition = document.startViewTransition(async () => {
        isDark.value = !isDark.value;
        await nextTick();
    });

    transition.ready.then(() => {
        // 定义动画关键帧
        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
        ];

        document.documentElement.animate(
            {
                // 如果是变黑（收缩），则反转关键帧（大 -> 小）
                // 如果是变亮（扩散），则正常关键帧（小 -> 大）
                clipPath: isGoingToDark ? [...clipPath].reverse() : clipPath,
            },
            {
                duration: 400,
                easing: 'ease-in',
                // 如果是变黑：动画作用于 OLD 视图（让明亮图层收缩）
                // 如果是变亮：动画作用于 NEW 视图（让明亮图层扩散）
                pseudoElement: isGoingToDark 
                    ? '::view-transition-old(root)' 
                    : '::view-transition-new(root)'
            }
        );
    });

    // 动画结束后清理类名
    transition.finished.then(() => {
        document.documentElement.classList.remove('dark-transition');
    });

    // LoadingBar 逻辑
    loadingBar.start()
    setTimeout(() => {
        loadingBar.finish()
    }, 300)
}
</script>

<style lang="scss">
.theme-switch {}
/* 全局样式，控制 View Transitions */

// 1. 禁用默认的淡入淡出动画，并设置混合模式
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

// 2. 关键：控制层级
// 默认情况：New 在 Old 上面 (Z-Index: New > Old)
// 这里的逻辑是：
// 当切换到黑暗模式时 (.dark-transition)，我们希望 Old(明亮) 在上面收缩
// 所以强制提升 Old 的 z-index
.dark-transition::view-transition-old(root) {
  z-index: 9999;
}
.dark-transition::view-transition-new(root) {
  z-index: 1;
}
</style>