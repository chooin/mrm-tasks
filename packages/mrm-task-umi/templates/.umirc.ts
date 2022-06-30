import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  define: {
    APP_NAME: 'APP_NAME',
  },
  history: {
    type: 'browser',
  },
  npmClient: 'pnpm',
  routes,
});
