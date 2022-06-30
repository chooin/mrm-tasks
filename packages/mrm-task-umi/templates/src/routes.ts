const routes = [
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
