import { defineConfig } from '@umijs/max';
import routes from './src/routes';

export default defineConfig({
  define: {
    APP_NAME: 'APP_NAME',
  },
  initialState: {},
  model: {},
  npmClient: 'pnpm',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  devtool: 'hidden-source-map',
  hash: true,
  routes,
});
