import React from 'react';
import { Layout } from './styled';

type Props = {
  children: React.ReactElement;
};

export default (props: Props): JSX.Element => {
  return <Layout>{React.cloneElement(props.children, {})}</Layout>;
};
