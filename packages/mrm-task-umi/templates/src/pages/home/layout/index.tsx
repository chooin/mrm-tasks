import { Layout } from './styled';

export default ({children}: UMI.Layout): JSX.Element => {
  return (
    <Layout>{children}</Layout>
  );
};
