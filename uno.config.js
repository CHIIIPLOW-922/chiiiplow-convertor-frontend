import { defineConfig, presetAttributify, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({
    presets: [
        presetAttributify(),
        presetWind3(), // 默认预设 (类似 Tailwind CSS)
        presetIcons({ scale: 1.2 }) // 图标预设
    ],
    shortcuts: {
        btn: 'px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600',
        "container-center": 'min-h-screen flex justify-center items-center bg-gray-100',
        card: 'bg-white rounded-lg shadow-md p-6',
    }
})