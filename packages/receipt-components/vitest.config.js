const path = require('path');

export default {
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ep': path.resolve(__dirname, './src/renderers/escpos'),
      '@ast': path.resolve(__dirname, './src/ast'),
      '@renderer': path.resolve(__dirname, './src/renderer'),
    },
  },
};
