import { resolve } from "path"
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            name: 'index',
            fileName: format => `index.${format}.js`,
            entry: resolve(__dirname, 'src/index.js')
        },
        rollupOptions: {
            external: ['vue']
        }
    }
})