import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    APP_ENV: 'local',
    API_URL: 'https://example.com/v1/',
  },
  devtool: 'source-map',
});
