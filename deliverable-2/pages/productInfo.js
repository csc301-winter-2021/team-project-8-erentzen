import React, { useState , useCallback }from 'react';
import { Layout, Page, Tabs, Card, DataTable, MediaCard } from '@shopify/polaris';

// WIP
const sampleInfo = {
    pid: '12345',
    name: 'Test Product',
    type: 'Test Type',
    amount: 5,
    picture: '',
    description: 'test',
    history: [['Online', 4, 42.99, '2021-02-25'], ['Local', 1, 49.99, '2021-02-28']]
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
            description: '',
            history = [],

        }
    }
    getData(){
        //BackEnd

        return sampleInfo
    }
    render(){
        return(
            <Layout>
                <Layout.Section>
                <MediaCard
                    title=""
                    description={this.state.description}
                >
                    <img
                        alt=""
                        width="100%"
                        height="100%"
                        style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        }}
                        src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                    />
                      <Card title={'Product ID: ' + sampleInfo.pid} sectioned>
                      <span>Name: {sampleInfo.name}</span> <br />
                      <span>In Stock: {sampleInfo.amount}</span> <br />
                      <span>Type: {sampleInfo.type}</span> <br />
                      <span>Description: {sampleInfo.description}</span> <br />
                    </Card>
                    <Card title={'Sales History'} sectioned>
                        <DataTable
                            description={'Sales History'}
                            columnContentTypes={[
                                'text',
                                'numeric',
                                'numeric',
                                'text'
                            ]}
                            headings={[
                                'Type',
                                'Count',
                                'Price',
                                'Date'
                            ]}
                            rows={sampleInfo.history}
                            // totals={['', '', '', 255, '$155,830.00']}
                        />
                    </Card>
                    </MediaCard>
                </Layout.Section>
            </Layout>
            
        )
    }
}


export default productInfo;