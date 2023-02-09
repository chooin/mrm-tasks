import React from 'react';
import { IRouteComponentProps } from 'umi';

const Layout: React.FC<IRouteComponentProps> = (props) => {
  return <>{React.cloneElement(props.children, {})}</>;
};

export default Layout;
