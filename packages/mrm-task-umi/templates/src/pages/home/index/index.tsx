import { IRouteProps } from 'umi';
import { useLoad, useMount } from '@/hooks';
import { Page } from './styled';

export default ({ route }: IRouteProps): JSX.Element => {
  useLoad(() => {});

  useMount(() => {});

  return <Page>{route.title}</Page>;
};
