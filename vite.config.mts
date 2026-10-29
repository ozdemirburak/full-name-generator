import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import dts from 'unplugin-dts/vite';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        'index.full': fileURLToPath(new URL('./src/index.full.ts', import.meta.url))
      },
      name: 'FullNameGenerator',
      formats: ['cjs', 'es'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'js'}`
    },
    outDir: 'dist',
    target: 'es2020',
    minify: 'oxc',
    sourcemap: false,
  },
  plugins: [
    dts({
      bundleTypes: true,
      outDirs: [
        { dir: 'dist', moduleFormat: 'esm' },
        { dir: 'dist', moduleFormat: 'cjs' }
      ],
    })
  ]
});
