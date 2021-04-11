import { Layout, Page, TextStyle } from '@shopify/polaris';
import NavTabs from './NavTabs';
import Nav from '../components/NavBar';

const Index = () => (
    <Page>
      <Layout>
        <TextStyle variation="positive">
          {/* Sample app using React and Next.js. HI! */}
        </TextStyle>
        <NavTabs></NavTabs>
      </Layout>
    </Page>
  );
  
  export default Index;