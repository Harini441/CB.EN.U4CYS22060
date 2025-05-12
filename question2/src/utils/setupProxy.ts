
// This file will be used by vite.config.ts to proxy API requests in development

export const setupProxy = {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true,
    secure: false,
  }
};
