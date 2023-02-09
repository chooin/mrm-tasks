import React from 'react';
import type { IRouteProps } from 'umi';
import { useMount } from '@/hooks';
import { Page } from './styled';

const Index: React.FC<IRouteProps> = ({ route }) => {
  useMount(() => {});

  return <Page>{route.name}</Page>;
};

export default Index;
