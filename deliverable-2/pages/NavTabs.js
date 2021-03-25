import React, { useState , useCallback }from 'react';
import { Layout, Page, Tabs, Card, DataTable, Button, TextField, Icon } from '@shopify/polaris';
import Dashboard from './Dashboard';
import Order from './Order';
import {Inventory} from './inventory';
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
            return <Dashboard></Dashboard>
        } else if(selected === 2) {
            return <Order></Order>
        } else if (selected === 1) {
            return <Inventory></Inventory>
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
        id: 'Orders',
        content: 'Orders',
        panelID: 'Orders',
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


