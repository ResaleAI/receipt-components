import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'receipt-components',
  target: 'es2019',
  entry: ['src/main.ts'],
  outDir: 'dist',
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['cjs', 'esm'],
});
