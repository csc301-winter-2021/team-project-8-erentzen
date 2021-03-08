import React from 'react';
import {Navigation} from '@shopify/polaris';

export default class Nav extends React.Component {
  render() {
    return (
      <Navigation location="/">
  <Navigation.Section
    items={[
      {
        url: 'DASHBOARDURL',
        label: 'Dashboard',
      },
      {
        url: 'INVENTORYURL',
        label: 'Inventory',
      },
      {
        url: 'RESTOCKURL',
        label: 'Restock',
      },
      {
        url: 'ORDERURL',
        label: 'Order',
      },
    ]}
  />
</Navigation>
    );
  }
}
