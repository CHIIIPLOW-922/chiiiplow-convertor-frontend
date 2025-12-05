import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    
    // 重点 2：必须在 plugins 数组里调用它
    UnoCSS(), // <--- 重点：检查有没有这一行，且要加括号 ()

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
        }
      ],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'src/components.d.ts'
    })
  ],

  resolve: {

    alias: {
      '@': resolve('src')
    }
  },
})
