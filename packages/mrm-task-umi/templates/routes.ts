interface Route {
  title: string;
  path: string;
  component: string;
}

export default [
  { title: 'Home Page', path: '/', component: '@/pages/home/index' }
] as Route[];
