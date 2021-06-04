import {Layout} from '../../layout/styled';
import {Page} from './styled'

export default ({}) => {
  return (
    <Layout>
      <Page>home/index</Page>
    </Layout>
  )
}

export const getStaticProps = async ({}) => {
  return {}
}
