import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), dts({
        rollupTypes: true,
        tsconfigPath: './tsconfig.app.json',
    })],
    resolve: {
        alias: {
            '@': '/src',
            '@/packages': '/packages',
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'packages/carousel/index.ts'),
            name: 'react-csl-carousel',
            formats: ['es', 'cjs', 'umd'],
            fileName: (format) => `react-csl-carousel.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
        emptyOutDir: true,
    },
} as UserConfig);
