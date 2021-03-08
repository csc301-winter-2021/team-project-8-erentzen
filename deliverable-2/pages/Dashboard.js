import React, { Component } from "react";
import Chart from "chart.js";
import {Line, Pie} from 'react-chartjs-2';

import {Card, Layout, AppProvider, DataTable} from '@shopify/polaris';

// import './Dashboard.css';

class Dashboard extends Component{
    rows = [
        ['004','UofT T-shirt', 'Black', 1],
        ['005','UofT T-shirt', 'Black', 1]
        
      ];
    data = {
        labels:[
            'low stock',
            'regular'
        ],
        datasets:[{
            data: [300, 50],
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
    render(){
        return(
            <AppProvider>
                <Layout>
                    <Layout.Section>
                        <Card title="Low Stock" sectioned>
                            <DataTable
                                columnContentTypes={[
                                    'text',
                                    'numeric',
                                    'numeric',
                                    'numeric',
                                    'numeric',
                                ]}
                                headings={[
                                    'ID',
                                    'Product',
                                    'Variant',
                                    'Stock'
                                ]}
                                rows={this.rows}
                                // totals={['', '', '', 255, '$155,830.00']}
                            />
                        </Card>
                    
                        <Card title="Recent Order" sectioned>
                            <DataTable
                                columnContentTypes={[
                                    'text',
                                    'numeric',
                                    'numeric',
                                    'numeric',
                                    'numeric',
                                ]}
                                headings={[
                                    'ID',
                                    'Product',
                                    'Variant',
                                    'Count'
                                ]}
                                rows={this.rows}
                                // totals={['', '', '', 255, '$155,830.00']}
                            />
                        </Card>
                    </Layout.Section>
                    <Layout.Section secondary>
                        <Card title="Inventory" sectioned>
                        <Pie
                            data={this.data}
                            // width={400}
                            // height={400}
                        />

                        </Card>
                    </Layout.Section>
                </Layout>
            </AppProvider>
            
        )
    }
}

export default Dashboard;