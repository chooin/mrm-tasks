import { IRoute } from 'umi';

/**
 * 路由文档
 * https://umijs.org/docs/convention-routing
 */
export default [
  {
    path: '/home',
    redirect: '/home/index',
    component: '@/layouts/default',
    routes: [
      {
        path: '/home/index',
        component: '@/pages/home/index',
        title: 'Home Page',
      },
    ],
  },
  {
    path: '/*',
    redirect: '/home/index',
  },
] as IRoute[];
