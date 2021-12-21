import React from 'react';
import { IRouteProps } from 'umi';
import { useMount } from '@/hooks';
import { Page } from './styled';

const Index: React.FC = ({ route }: IRouteProps): JSX.Element => {
  useMount(() => {});

  return <Page>{route.title}</Page>;
};

export default Index;
