import React, { useState , useEffect, useCallback }from 'react';
import { Layout, Page, Tabs, Card, DataTable, Button, TextField, Icon } from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';
import { connect } from 'react-redux';
import { itemActions } from '../_actions/items.actions';
import ProductModal from './productInfo';

class Inventory extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.props.fetchAll()
    this.state.items = this.props.items
  }

  render() {
    return (
      <Page fullWidth>
        <Layout>
          <StockTabs items={this.props.items}></StockTabs>
        </Layout>
      </Page>
    );
  }
}


// Table for the products
function Table(props) {
  const [openModal, setOpenModal] = useState(false)
  const [clickableRows, setClickableRows] = useState([])
  const [curItem, setCurItem] = useState({
    id: 0,
    name: "",
    type: "",
    stock: 0
  })

  const setItem = (item) => {
    setOpenModal(true)
    setCurItem(item)
  }

  useEffect(() => {
    if (Array.isArray(props.items.items)) {
      let newRows = []
      for (let i =0; i< props.items.items.length; i+=1) {
        let newVersion = []
        newVersion.push(
          <div onClick={() => setItem({
            name: props.items.items[i][1],
            id: props.items.items[i][0],
            stock: props.items.items[i][3],
            type: props.items.items[i][2]
          })}>{props.items.items[i][0]}</div>
        )
        newVersion = newVersion.concat(props.items.items[i].slice(1, props.items.items[i].length))
        newRows.push(newVersion)
      }
      setClickableRows(newRows)
    }
  }, [props.items.items]);

 
  const [sortedRows, setSortedRows] = useState(null);
  const LOW_STOCK_THRESHOLD = 20;

  let filteredRows = [];
  let searchKeyword = ""
  const initiallySortedRows = Array.isArray(clickableRows) ? clickableRows : []
  // const initiallySortedRows = []

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

  const searchRows = (rows, keyword) => {
    return rows.filter(row => 
      row[1].toString().toLowerCase().includes(keyword.toLowerCase()));
  }
  
  const handleChange = useCallback((newValue) => {
    setSortedRows(searchRows(rows, newValue.toString()));
  }, []);

  const rows = sortedRows ? sortedRows : filteredRows;
  ;
  const handleSort = useCallback(
    (index, direction) => setSortedRows(sortRows(rows, index, direction)),
    [rows],
  );

  // bug for sort by index
  const sortRows = (rows, index, direction) => {
    return [...rows].sort((rowA, rowB) => {
      const result = rowA[index] > rowB[index] ? 1 : -1;
      return direction === 'descending' ? -result : result;
    });
  }
  
  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    for (let i = 0; i < rows.length; i++) {
      let value = rows[i];
      for (let j = 0; j < value.length; j++) {
          let innerValue =  value[j]===null?'':value[j].toString();

          if(!j){
            innerValue = value[0].props.children.toString()
          }

          let result = innerValue.replace(/"/g, '""');
          if (result.search(/("|,|\n)/g) >= 0)
              result = '"' + result + '"';
          if (j > 0)
              csvContent += ',';
          csvContent += result;
      }
      csvContent += '\n';
    }  
    
    // let encodedUri = encodeURI(csvContent);
    // window.open(encodedUri);

    var hiddenElement = document.createElement('a');
    hiddenElement.href = encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'exported_data.csv';
    hiddenElement.click();
  }

  return (
    <Layout>
      <Layout.Section>
        <SearchBar onChange={handleChange}></SearchBar>
      </Layout.Section>
      <Layout.Section>
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
      </Layout.Section>
      <Layout.Section>
        <Button plain onClick={downloadCSV}>Download CSV</Button>
      </Layout.Section>
      <ProductModal active={openModal} setActive={setOpenModal} name={curItem.name} stock={curItem.stock} type={curItem.type} id={curItem.id}/>
    </Layout>
  );
}

function SearchBar(props) {
  const [value, setValue] = useState('');
  const handleChange = useCallback((newValue) => {
    setValue(newValue);
    props.onChange(newValue);
  }, []);
  return (
    <TextField 
      id="search-bar"
      value={value}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search products"
      onChange={handleChange}
    />
  );
}

// Tabs for identifying status of products
function StockTabs(props) {
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
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <Card.Section>
          <Table items={props.items} selected={selected}></Table>
        </Card.Section>
      </Tabs>
    </Card>
  );
}

function mapState(state) {
  const { items } = state;
  return { items }
}

const actionCreators = {
  fetchAll: itemActions.fetchAll
}

const connectedInventory = connect(mapState, actionCreators)(Inventory);
export {connectedInventory as Inventory };