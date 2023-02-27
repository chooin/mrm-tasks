import { defineConfig } from '@umijs/max';
import routes from './src/routes';

export default defineConfig({
  define: {
    APP_NAME: 'APP_NAME',
  },
  history: {
    type: 'browser',
  },
  initialState: {},
  model: {},
  npmClient: 'pnpm',
  devtool: 'hidden-source-map',
  routes,
});
