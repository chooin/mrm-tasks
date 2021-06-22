import {useMount} from '@/hooks';
import { Page } from './styled';

export default ({}: UMI.Page): JSX.Element => {
  useMount(() => {});

  return (
    <Page>
      /home/index
    </Page>
  );
};
