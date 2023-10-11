import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'index.full': resolve(__dirname, 'src/index.full.ts')
      },
      name: 'FullNameGenerator',
      formats: ['cjs', 'es'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'js'}`
    },
    outDir: 'dist',
    minify: 'terser',
    sourcemap: true,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    })
  ]
});
