import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'receipt-layout',
  entry: ['src/main.ts'],
  outDir: 'dist',
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['cjs', 'esm'],
});
