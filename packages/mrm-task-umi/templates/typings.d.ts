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

declare interface Page<T> {
  children: React.ReactNode;
}
declare interface Page<T = undefined> {
  children: React.ReactNode;
}
declare const API_URL: string;
