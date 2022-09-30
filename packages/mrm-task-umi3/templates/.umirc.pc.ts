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
  devtool: 'hidden-source-map',
  antd: {},
  theme: {
    'primary-color': '#333',
  },
  hash: true,
  routes,
});
