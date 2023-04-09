const routes = [
  {
    path: '/home',
    component: '@/layouts/default',
    routes: [
      {
        name: 'Home Page',
        path: '/home/index',
        component: '@/pages/home/index',
      },
    ],
  },
  {
    path: '/*',
    redirect: '/home/index',
  },
];

export default routes;
