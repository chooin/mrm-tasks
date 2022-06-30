import type { IRoute } from 'umi';

/**
 * 路由文档
 * https://umijs.org/docs/convention-routing
 */
const routes: IRoute[] = [
  {
    path: '/home',
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
];

export default routes;
