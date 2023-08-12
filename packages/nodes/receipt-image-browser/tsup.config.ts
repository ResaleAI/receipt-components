import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'receipt-image-browser',
  entry: ['src/main.ts'],
  outDir: 'dist',
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['cjs', 'esm'],
});
