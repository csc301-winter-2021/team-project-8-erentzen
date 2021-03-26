import React, {useCallback, useState} from 'react';
import {Card, DataTable, Page,Button, FormLayout, TextField, Form} from '@shopify/polaris';


const sampleRows = [
    [1, 'UofT Hoodie', 'White, S', 1, 0, 59.99, 5],
    [2, 'UofT Hoodie', 'White, L', 2, 0, 59.99, 5],
]; 

const sampleList = {
    'i1': ['UofT Hoodie', 'White, S', 1, 0, 59.99],
    'i2': ['UofT Hoodie', 'White, L', 2, 0, 59.99],
    'i3': ['UofT Hat', '/', 15, 1, 32.99],
    
}


export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pID: '',
            amount: 0,
            total: 0,
            updates: {},
            rows: []
        }
    }

    getData() {
        //TODO: Database
        return sampleRows
    }

    updateRows = () => {
        let temp = this.state.updates
        let newRows = []
        Object.keys(temp).forEach((key) => {
            newRows.push(temp[key])
        });
        this.setState({rows: newRows})
    }

    confirm = () => {
        //TODO: Database
        this.setState({total: 0,
            updates: {},
            rows: []});
    }
    
    
    handlePidChange= (event) => {
        this.setState({pID: event.target.value});
    }

    handleAmountChange= (event) => {
        this.setState({amount: event.target.value});
    }


    calculateTotal = () => {
        let newTotal = 0;
        for (const key in this.state.updates) {
            newTotal += this.state.updates[key][5] * this.state.updates[key][6];
        }
        this.setState({total: newTotal})
    }

    Load = () => {
        const data = this.getData()
        this.addProduct(data)
    }

    addProduct = (items) => {
        
        let newUpdate = this.state.updates;
        items.forEach((item) => {
            const key = 'id' + item[0]
            if (key in newUpdate){
                newUpdate[key][6] += item[6]
            } else {
                newUpdate[key] = item
            }
        });
        this.updateRows();
        this.calculateTotal();
    }


    render() {
        return (
            <Page title="Inventory Update">
                
                <Form>
                    <input type='text' name='pID' placeholder='product id' value={this.state.pID} onChange={this.handlePidChange} />
                    <input type='number' name='amount' placeholder='product amount' value={this.state.amount} onChange={this.handleAmountChange} />
                    
                    <Button type="button" onClick={() => this.addProduct([[this.state.pID, sampleList['i'+this.state.pID][0], 
                        sampleList['i'+this.state.pID][1], sampleList['i'+this.state.pID][2], sampleList['i'+this.state.pID][3], 
                        sampleList['i'+this.state.pID][4], parseInt(this.state.amount)]])}>Add</Button>
                    <Button plain onClick={this.Load}>+CSV</Button>
                </Form>
                

                <Card>
                    <DataTable
                        columnContentTypes={[
                        'numeric',
                        'text',
                        'text',
                        'numeric',
                        'numeric',
                        'numeric',
                        'component',
                    ]}
                    headings={[
                        'ID',
                        'Product',
                        'Variant',
                        'Stock',
                        'Pending',
                        'Price ($)',
                        'Modify',
                    ]}
                    rows={this.state.rows}
                    totals={['', '', '', '', '', '', this.state.total]}
                    showTotalsInFooter
                />
                </Card>
                <Button onClick={this.confirm}>Confirm</Button>
                
            </Page>
          );
    }
}

