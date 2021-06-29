interface Route {
  path: string;
  component: string;
  title: string;
  redirect?: string;
  exact?: boolean;
  routes?: Route[];
}

/**
 * 路由文档
 * https://umijs.org/docs/convention-routing
 */
export default [
  {
    path: '/',
    redirect: '/home/index',
  },
  {
    path: '/home',
    component: '@/pages/home/layout',
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
    component: '@/pages/error/layout',
    routes: [
      {
        path: '/*',
        component: '@/pages/error/404',
        title: 'Page Not Found',
      },
    ],
  }
] as Route[]
