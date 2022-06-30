import React from 'react';

type Props = {
  children: React.ReactElement;
};

const Layout: React.FC<Props> = (props) => {
  return <>{React.cloneElement(props.children, {})}</>;
};

export default Layout;
