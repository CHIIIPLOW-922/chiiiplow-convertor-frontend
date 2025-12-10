import { ref, watch, computed } from 'vue'
import tinycolor from 'tinycolor2'

// 1. 定义默认的语义底色 (Naive UI 的官方默认色，以此为基础微调)
const defaultSemantic = {
    info: '#2080F0',
    success: '#18a058',
    warning: '#f0a020',
    error: '#d03050',
}

// 2. 核心状态（单例模式，外部定义）
const primaryColor = ref(localStorage.getItem('theme-color') || '#2A947D')

// 3. 辅助函数：生成单颜色的全套交互状态 (Hover, Pressed, Suppl)
// actionFactor: 变亮/变暗的程度，默认 10%
function generateColorPalette(name, colorStr, actionFactor = 10) {
    const c = tinycolor(colorStr)
    const isLight = c.isLight() // 判断颜色是亮色还是暗色，决定 Hover 是变亮还是变暗

    // 这里的逻辑可以根据喜好微调，Naive UI 默认逻辑通常是：
    // Hover: 变亮 (lighten)
    // Pressed: 变暗 (darken)
    // Suppl: 变得更亮 (用于辅助背景等)
    return {
        [`${name}Color`]: colorStr,
        [`${name}ColorHover`]: c.clone().lighten(actionFactor).toString(),
        [`${name}ColorPressed`]: c.clone().darken(actionFactor).toString(),
        [`${name}ColorSuppl`]: c.clone().lighten(actionFactor + 10).toString()
    }
}

// 4. 核心算法：根据主色生成这一套“和谐”的语义色
const themeOverrides = computed(() => {
    const primary = primaryColor.value

    // 策略 A: Info 颜色通常跟随主色，或者作为一个稍淡的变体
    // 这里我们让 Info 直接跟随 Primary (很多现代 UI 都是这样设计的)

    // 策略 B: “色彩和谐化” (Color Harmony)
    // 我们不直接用纯红纯绿，而是把 Primary 混入 15% 到标准语义色中
    // 这样如果你的主色是“紫色”，你的报错红色也会带一点点紫调，看起来非常协调。
    const mixAmount = 30
    const infoBase = tinycolor.mix(defaultSemantic.info, primary, mixAmount).toString()
    const successBase = tinycolor.mix(defaultSemantic.success, primary, mixAmount).toString()
    const warningBase = tinycolor.mix(defaultSemantic.warning, primary, mixAmount).toString()
    const errorBase = tinycolor.mix(defaultSemantic.error, primary, mixAmount).toString()

    return {
        common: {
            // 1. 生成主色系列
            ...generateColorPalette('primary', primary),

            // 2. 生成 Info 系列

            // 3. 生成和谐后的语义色系列
            ...generateColorPalette('info', infoBase),
            ...generateColorPalette('success', successBase),
            ...generateColorPalette('warning', warningBase),
            ...generateColorPalette('error', errorBase),
        }
    }
})

// 5. 监听保存
watch(primaryColor, (val) => {
    localStorage.setItem('theme-color', val)
})

export function customColorTheme() {
    const setPrimaryColor = (val) => {
        primaryColor.value = val
    }

    return { primaryColor, themeOverrides, setPrimaryColor }
}