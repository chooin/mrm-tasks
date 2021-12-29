import React from 'react';
import { Layout } from './styled';

type Props = {
  children: React.FC<undefined>;
};

export default (props: Props): JSX.Element => {
  return <Layout>{props.children}</Layout>;
};
