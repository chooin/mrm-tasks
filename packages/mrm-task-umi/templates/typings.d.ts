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

declare namespace Umi {
  export interface Layout {
    children: React.ReactNode;
  }
  export interface Page<T> {}
  export interface Page<T = undefined> {}
  export interface Component<T> {
    children: React.ReactNode;
  }
  export interface Component<T = undefined> {
    children: React.ReactNode;
  }
}
declare const API_URL: string;
