import { defineConfig } from '@umijs/max';

export default defineConfig({
  define: {
    APP_ENV: 'production',
    API_URL: 'https://example.com/v1/',
  },
  headScripts: [
    'https://cdn.staticfile.org/react/18.2.0/umd/react.production.min.js',
    'https://cdn.staticfile.org/react-dom/18.2.0/umd/react-dom.production.min.js',
  ],
});
