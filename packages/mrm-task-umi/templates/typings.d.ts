declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

// 和 Umi 相关
declare namespace Umi {
  export type Layout = React.PropsWithChildren<undefined>;
  export type Page<T = undefined> = React.PropsWithChildren<T>;
  export type Component<T = undefined> = React.PropsWithChildren<T>;
  export type Element = JSX.Element | null;
}
// 全局变量
declare const API_URL: string;
