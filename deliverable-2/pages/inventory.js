import React, { useState , useCallback }from 'react';
import { Layout, Page, Tabs, Card, DataTable, TextStyle, Button } from '@shopify/polaris';

class Inventory extends React.Component {
  state = {};

  render() {
    return (
      <Page fullWidth>
        <Layout>
          <StockTabs></StockTabs>
        </Layout>
      </Page>
    );
  }
}



// Table for the products
function Table(props) {
  const [sortedRows, setSortedRows] = useState(null);
  const LOW_STOCK_THRESHOLD = 5;

  // Dummy data
  const initiallySortedRows = [
    [1, "UofT hoodie", "White, S", 34, 2, 59.99],
    [2, "UofT hoodie", "White, L", 52, 1, 59.99],
    [3, "UofT hat", "Blue", 15, 0, 32.99],
    [4, "UofT T-Shirt", "Black", 0, 0, 27.99],
    [5, "UofT T-Shirt", "White", 1, 0, 27.99]
  ]

  let filteredRows = [];

  switch (props.selected) {
    case 1: // Low stock
      filteredRows = initiallySortedRows.filter(row =>
        row[3] <= LOW_STOCK_THRESHOLD);
      break;
    case 2: // Pending transaction
      filteredRows = initiallySortedRows.filter(row => row[4] != 0);
      break;
    default:
      filteredRows = initiallySortedRows;
  }

  const rows = sortedRows ? sortedRows : filteredRows;
  ;
  const handleSort = useCallback(
    (index, direction) => setSortedRows(sortRows(rows, index, direction)),
    [rows],
  );

  function sortRows(rows, index, direction) {
    return [...rows].sort((rowA, rowB) => {
      const result = rowA[index] > rowB[index] ? 1 : -1;
      return direction === 'descending' ? -result : result;
    });
  }
  
  function downloadCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    for (let i = 0; i < rows.length; i++) {
      let value = rows[i];
      for (let j = 0; j < value.length; j++) {
          let innerValue =  value[j]===null?'':value[j].toString();
          let result = innerValue.replace(/"/g, '""');
          if (result.search(/("|,|\n)/g) >= 0)
              result = '"' + result + '"';
          if (j > 0)
              csvContent += ',';
          csvContent += result;
      }
      csvContent += '\n';
    }  
    let encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  return (
    <Layout>
      <Layout.Section>
        <Card>
          <DataTable
            columnContentTypes={[
              'numeric',
              'text',
              'text',
              'numeric',
              'numeric',
              'numeric'
            ]}
            headings={[
              'ID',
              'Product',
              'Variant',
              'Stock',
              'Pending',
              'Price'
            ]}
            rows={rows}
            sortable={[true, true, true, true, true, true]}
            defaultSortDirection="descending"
            onSort={handleSort}
          />
        </Card>
      </Layout.Section>
      <Layout.Section>
        <Button plain onClick={downloadCSV}>Download CSV</Button>
      </Layout.Section>
    </Layout>
  );
}



// Tabs for identifying status of products
function StockTabs() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all',
      content: 'All',
      accessibilityLabel: 'All',
      panelID: 'all-content',
    },
    {
      id: 'low-stock',
      content: 'Low Stock',
      panelID: 'low-stock-content',
    },
    {
      id: 'pending-transaction',
      content: 'Pending Transaction',
      panelID: 'pending-transaction-content',
    }
  ];

  return (
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <Table selected={selected}></Table>
    </Tabs>
  );
}

export default Inventory;