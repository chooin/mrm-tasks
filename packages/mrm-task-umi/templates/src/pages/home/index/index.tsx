import { useMount } from '@/hooks';
import { Page } from './styled';

export default ({}: Umi.Page): JSX.Element => {
  useMount(() => {});

  return <Page>/home/index</Page>;
};
