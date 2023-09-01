import React from 'react';
import { useRouteProps } from '@umijs/max';
import { useMount } from '@/hooks';
import { Page } from './styled';

const Index: React.FC = () => {
  const routeProps = useRouteProps();

  useMount(() => {});

  return <Page>Halo</Page>;
};

export default Index;
