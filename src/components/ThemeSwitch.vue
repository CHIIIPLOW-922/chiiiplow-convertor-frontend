<template>
    <n-button class="w-[45px] h-[45px]" @click="changeThemeLoading($event)" text>
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
    // 1. browser check
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

    const isGoingToDark = !isDark.value;

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
                clipPath: isGoingToDark ? [...clipPath].reverse() : clipPath,
            },
            {
                duration: 400,
                easing: 'ease-in',
                pseudoElement: isGoingToDark 
                    ? '::view-transition-old(root)' 
                    : '::view-transition-new(root)'
            }
        );
    });

    // clear dark-transition class when animation end
    transition.finished.then(() => {
        document.documentElement.classList.remove('dark-transition');
    });

    // LoadingBar
    loadingBar.start()
    setTimeout(() => {
        loadingBar.finish()
    }, 300)
}
</script>

<style lang="scss">
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

.dark-transition::view-transition-old(root) {
  z-index: 9999;
}
.dark-transition::view-transition-new(root) {
  z-index: 1;
}
</style>