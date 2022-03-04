import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            name: 'index',
            fileName: format => `index.${format}.js`,
            entry: path.resolve(__dirname, 'src/index.ts')
        },
        rollupOptions: {
            external: ['vue']
        }
    }
})