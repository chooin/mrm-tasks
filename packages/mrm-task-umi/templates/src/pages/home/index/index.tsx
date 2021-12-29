import React from 'react';
import { IRouteComponentProps } from 'umi';
import { useMount } from '@/hooks';
import { Page } from './styled';

const Index = ({ route }: IRouteComponentProps): JSX.Element => {
  useMount(() => {});

  return <Page>{route.title}</Page>;
};

export default Index;
