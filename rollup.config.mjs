import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: './src/index.ts',
  output: {
    file: './src/index.js',
    format: 'cjs'
  },
  plugins: [typescript(), terser()]
};
