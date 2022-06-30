import React from 'react';
import { useMount } from '@/hooks';
import { Page } from './styled';

const Index: React.FC = () => {
  useMount(() => {});

  return <Page>Halo</Page>;
};

export default Index;
