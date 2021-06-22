import { Layout } from './styled';

export default ({ children }: Umi.Layout): JSX.Element => {
  return <Layout>{children}</Layout>;
};
