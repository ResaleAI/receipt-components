import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'receipt-escpos-renderer',
  target: 'es2019',
  entry: ['src/main.ts', 'src/util/index.ts', 'src/linked-list.ts'],
  outDir: 'dist',
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['cjs', 'esm'],
});
