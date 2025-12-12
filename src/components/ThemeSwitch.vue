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

// 传入 event 参数
const changeThemeLoading = (event) => {
    // 1. 浏览器兼容性检查
    // 如果浏览器不支持 View Transitions API，直接切换并返回
    if (!document.startViewTransition) {
        isDark.value = !isDark.value;
        return;
    }

    // 2. 获取点击位置（鼠标坐标）
    const x = event.clientX;
    const y = event.clientY;

    // 3. 计算扩散圆的最大半径
    // Math.hypot 计算直角三角形斜边，确保圆能覆盖屏幕最远的角落
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
    );

    // 4. 开始视图过渡
    const transition = document.startViewTransition(async () => {
        // 在这里更新状态（切换主题）
        isDark.value = !isDark.value;
        // 等待 DOM 更新完成
        await nextTick();
    });

    // 5. 定义动画
    transition.ready.then(() => {
        // 对 "新视图" (::view-transition-new(root)) 执行剪裁动画
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`, // 起始：鼠标位置，半径0
                    `circle(${endRadius}px at ${x}px ${y}px)` // 结束：覆盖全屏
                ]
            },
            {
                duration: 400, // 动画时长
                easing: 'ease-in', // 缓动函数
                // 指定动画作用于伪元素 new(root)
                pseudoElement: '::view-transition-new(root)'
            }
        );
    });

    // 你的原有 LoadingBar 逻辑（可选，因为扩散效果已经很明显了）
    loadingBar.start()
    setTimeout(() => {
        loadingBar.finish()
    }, 300)
}


</script>

<style lang="scss">
.theme-switch {}
</style>