import React, { useState , useCallback }from 'react';
import { Layout, Page, Tabs, Card, DataTable, TextStyle } from '@shopify/polaris';

// WIP
const sampleInfo = {
    pid: '12345',
    name: 'Test Product',
    type: 'Test Type',
    amount: 5,
    picture: ''
}

class productInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            pid: '',
            amount: 0,
            type: '',
            name: '',
            picture: '',

        }
    }
    getData(){
        //BackEnd

        return sampleInfo
    }
    render(){
        return (
            <Page title="Product Info" fullWidth>
                <Layout>

                </Layout>
            </Page>
        );
    }
}


export default productInfo;