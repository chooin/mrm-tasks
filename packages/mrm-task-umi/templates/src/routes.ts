import { IRoute } from "umi";

/**
 * 路由文档
 * https://umijs.org/docs/convention-routing
 */
export default [
  {
    path: "/",
    redirect: "/home/index",
  },
  {
    path: "/home",
    redirect: "/home/index",
    component: "@/layouts/default",
    routes: [
      {
        path: "/home/index",
        component: "@/pages/home/index",
        title: "Home Page",
      },
    ],
  },
  {
    path: "/*",
    component: "@/pages/error/404",
  },
] as IRoute[];
