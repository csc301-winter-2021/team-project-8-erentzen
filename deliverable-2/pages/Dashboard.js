import React, { useState, useCallback, Component } from "react";
import Chart from "chart.js";
import {Line, Pie} from 'react-chartjs-2';

import {Card, Layout, Page, AppProvider, DataTable} from '@shopify/polaris';
import { connect } from 'react-redux';
import { itemActions } from '../_actions/items.actions';



class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAll()
        this.props.getRecentOrder()
    }

    render() {
      return (
        <Page fullWidth>
          <Layout>
              <PieChart items={this.props.items.items} ></PieChart>
              <LowStkTable items={this.props.items.items}></LowStkTable>
              <RecentOrderTable orders={this.props.items.orders}></RecentOrderTable>
          </Layout>
        </Page>
      );
    }
  }

function PieChart(props) {
    const LOW_STOCK_THRESHOLD = 20;
    //Dummy Data
    // const initiallySortedRows = [
    //     [1, "UofT hoodie", "White, S", 34, 2, 59.99],
    //     [2, "UofT hoodie", "White, L", 52, 1, 59.99],
    //     [3, "UofT hat", "Blue", 15, 0, 32.99],
    //     [4, "UofT T-Shirt", "Black", 0, 0, 27.99],
    //     [5, "UofT T-Shirt", "White", 1, 0, 27.99]
    // ]
    const initiallySortedRows = Array.isArray( props.items) ? props.items:[]
   
    
    const getLowStk = (rows) => {
        return rows.filter(row =>
            row[3] <= LOW_STOCK_THRESHOLD)
    }
   
    const setData = (rows) => {
        
        return [getLowStk(rows).length, rows.length-getLowStk(rows).length]
    }

    let data = {
        labels:[
            'low stock',
            'regular'
        ],
        datasets:[{
            data: setData(initiallySortedRows),
            backgroundColor: [
            '#FF6384',
            '#36A2EB'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB'
            ]
        }]
    }

    return (
        <Layout.Section>
            <Card title="Inventory" sectioned>
            <Pie
                data={data}
            />

            </Card>
        </Layout.Section>
    )
}

function LowStkTable(props) {
    const [sortedRows, setSortedRows] = useState(null);
    const LOW_STOCK_THRESHOLD = 20;
    //Dummy Data
    // const initiallySortedRows = [
    //     [1, "UofT hoodie", "White, S", 34, 2, 59.99],
    //     [2, "UofT hoodie", "White, L", 52, 1, 59.99],
    //     [3, "UofT hat", "Blue", 15, 0, 32.99],
    //     [4, "UofT T-Shirt", "Black", 0, 0, 27.99],
    //     [5, "UofT T-Shirt", "White", 1, 0, 27.99]
    // ]
    const initiallySortedRows = Array.isArray( props.items) ? props.items:[]
    const getLowStk = (rows) => {
        return rows.filter(row =>
            row[3] <= LOW_STOCK_THRESHOLD)
    }

    let filteredRows = getLowStk(initiallySortedRows)

    const rows = sortedRows ? sortedRows : filteredRows;

    const handleSort = useCallback(
        (index, direction) => setSortedRows(sortRows(rows, index, direction)),
        [rows],
    );

    const sortRows = (rows, index, direction) => {
        return [...rows].sort((rowA, rowB) => {
          const result = rowA[index] > rowB[index] ? 1 : -1;
          return direction === 'descending' ? -result : result;
        });
      }
   
    return (
        <Layout.Section>
            <Card title="Low Stock" sectioned>
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
    )
}

function RecentOrderTable(props) {
    const VIEW_NUM = 5;
    const [sortedRows, setSortedRows] = useState(null);
    // Dummy
    // const initialOrderRows = [
    //     ['004','UofT T-shirt', 'Black', 1],
    //     ['005','UofT T-shirt', 'Black', 1]
        
    // ];
    // const initialOrderRows = props.orders
    const initialOrderRows = Array.isArray( props.orders) ? props.orders:[]
    let filteredRows = (initialOrderRows.length > VIEW_NUM) ? initialOrderRows.slice(0, VIEW_NUM) : initialOrderRows;
    const rows = sortedRows ? sortedRows : filteredRows;
    ;
    const handleSort = useCallback(
        (index, direction) => setSortedRows(sortRows(rows, index, direction)),
        [rows],
    );

    const sortRows = (rows, index, direction) => {
        return [...rows].sort((rowA, rowB) => {
        const result = rowA[index] > rowB[index] ? 1 : -1;
        return direction === 'descending' ? -result : result;
        });
    }
    return(
        <Layout.Section>
            <Card title="Recent Order" sectioned>
                <DataTable
                    columnContentTypes={[
                        'text',
                        'numeric',
                        'numeric',
                        'numeric',
                        'numeric'
                    ]}
                    headings={[
                        'ID',
                        'Product',
                        'Variant',
                        'Count'
                    ]}
                    rows={rows}
                    sortable={[true, true, true, true]}
                    defaultSortDirection="descending"
                    onSort={handleSort}
                />
            </Card> 
        </Layout.Section>
    )
}
function mapState(state) {
    return state
  }

const actionCreators = {
    fetchAll: itemActions.fetchAll,
    getRecentOrder: itemActions.getRecentOrder
}

const connectedDashboard = connect(mapState, actionCreators)(Dashboard);
export {connectedDashboard as Dashboard };