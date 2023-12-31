import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'receipt-components',
  target: 'es2019',
  entry: ['src/main.ts', 'src/renderers/escpos/index.ts'],
  outDir: 'dist',
  dts: true,
  splitting: false,
  sourcemap: 'inline',
  clean: true,
  format: ['cjs', 'esm'],
});
