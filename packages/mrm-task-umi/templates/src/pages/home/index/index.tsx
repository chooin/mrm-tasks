import { IGetInitialProps } from 'umi';
import { useMount } from '@/hooks';
import { Page } from './styled';

interface Props {
  path: string;
}

const Index = ({ path }: Umi.Page<Props>): Umi.Element => {
  useMount(() => {});

  return <Page>{path}</Page>;
};

Index.getInitialProps = (async (ctx) => ({
  path: ctx.path,
})) as IGetInitialProps<Props>;

export default Index;
