import { IRouteProps } from 'umi';
import { useMount } from '@/hooks';
import { Page } from './styled';

export default ({ route }: IRouteProps): JSX.Element => {
  useMount(() => {});

  return <Page>{route.title}</Page>;
};
