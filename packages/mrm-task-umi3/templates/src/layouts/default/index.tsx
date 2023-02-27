import React from 'react';
import type { IRouteComponentProps } from 'umi';

const Layout: React.FC<IRouteComponentProps> = (props) => {
  return <>{React.cloneElement(props.children, {})}</>;
};

export default Layout;
