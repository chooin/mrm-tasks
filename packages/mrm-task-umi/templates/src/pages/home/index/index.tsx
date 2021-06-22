import {useMount} from '@/hooks';
import { Page } from './styled';

export default (): JSX.Element => {
  useMount(() => {});

  return (
    <Page>
      Home/index
    </Page>
  );
};
