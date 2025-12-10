import { defineConfig, presetAttributify, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({
    // dark: 'class',
    presets: [
        presetAttributify(),
        presetWind3(),
        presetIcons({ scale: 1.2 }),
    ],
    shortcuts: {
        'app-theme': 'bg-white text-black dark:bg-#121212 dark:text-white',

        btn: 'px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600',
        "container-center": 'min-h-screen flex justify-center items-center bg-gray-100',
        card: 'bg-white rounded-lg shadow-md p-6',
    }
})