import { useMount } from '@/hooks';
import { Page } from './styled';
import { Hello } from './components';

export default (): JSX.Element => {
  useMount(() => {});

  return (
    <Page>
      <Hello>/home/index</Hello>
    </Page>
  );
};
