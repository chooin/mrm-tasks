import React from 'react';
import { IRouteComponentProps } from 'umi';
import { useMount } from '@/hooks';
import { Page } from './styled';

const Index: React.FC<IRouteComponentProps> = ({ route }) => {
  useMount(() => {});

  return <Page>{route.title}</Page>;
};

export default Index;
