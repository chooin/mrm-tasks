import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  define: {
    APP_NAME: 'APP_NAME',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  dva: {},
  antd: false,
  hash: true,
  routes,
});
