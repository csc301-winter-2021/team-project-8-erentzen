import React, { useState , useCallback }from 'react';
import { Layout, Page, Tabs, Card, DataTable, Button, TextField, Icon } from '@shopify/polaris';
import DashboardPage from './DashboardPages';
// import {InventoryUpdate} from '../components/InventoryUpdate';
// import {Inventory} from '../components/inventory';
import InventoryPage from './InventoryPage';
import InventoryUpdatePage from './InventoryUpdatePage';
// import '@shopify/polaris/styles.css';

export default class NavTabs extends React.Component {
    state = {};
    render() {
        return (
            <Page fullWidth>
                <Layout >
                    <TabsExample></TabsExample>
                </Layout>
            </Page>
        )
    }
};

function TabsExample() {
    const [selected, setSelected] = useState(0);
    const handleTabChange = useCallback(
      (selectedTabIndex) => setSelected(selectedTabIndex),
      [],
    );
    const displaySection = (selected) => {
        if (selected === 0) {
            return <DashboardPage></DashboardPage>
        } else if(selected === 2) {
            return <InventoryUpdatePage></InventoryUpdatePage>
        } else if (selected === 1) {
            return <InventoryPage></InventoryPage>
        }
    }
    const tabs = [
      {
        id: 'Dashboard',
        content: 'Dashboard',
        accessibilityLabel: 'Dashboard',
        panelID: 'Dashboard',
      },
      {
        id: 'Inventory',
        content: 'Inventory',
        panelID: 'Inventory',
      },
      {
        id: 'InventoryUpdates',
        content: 'Inventory Updates',
        panelID: 'InventoryUpdates',
      }
    ];
    return (
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section>
            {displaySection(selected)}
          </Card.Section>
        </Tabs>
      </Card>
    );
  }


