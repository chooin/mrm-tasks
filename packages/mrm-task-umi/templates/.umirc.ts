import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  define: {
    APP_NAME: 'APP_NAME',
  },
  history: {
    type: 'browser',
  },
  styledComponents: {},
  npmClient: 'pnpm',
  devtool: 'hidden-source-map',
  routes,
});
