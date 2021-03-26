import React, {useCallback, useState} from 'react';
import {Card, DataTable, Page,Button, TextField, Layout, DropZone,Stack, Thumbnail,Caption, Heading} from '@shopify/polaris';
import { connect } from 'react-redux';
import { itemActions } from '../_actions/items.actions';
import {NoteMinor} from '@shopify/polaris-icons';

//var mysql = require('mysql');

class InventoryUpdate extends React.Component {
    state = {};

    constructor(props) {
      super(props);
      this.state = {
        items: [],
        rows: [],
        updates: {},
        totalCount: 0,
      };
    }

  
    componentDidMount() {
      this.props.fetchAll()
      this.state.items = this.props.items
    }

    getInfo(id) {
        for(let i = 0; i < this.state.items.items.length; i++){
            if(this.state.items.items[i][0] == id){
                return this.state.items.items[i]
            }
        }
        return null
    }

    updateRows() {
        
        let newRow = []
        for(var key in this.state.updates){
            newRow.push(this.state.updates[key])
        }
        this.setState({rows: newRow})
        
    }

    addProduct = (id, amount) => {
        let newUpdate = this.state.updates;
        
        if (id in newUpdate){
            newUpdate[id][6] += amount
        } else {
            const info = this.getInfo(id)
            if(info == null){
                alert('id not exist')
            }else{
                info.push(amount)
                newUpdate[id] = info
                
            }
        }
        this.setState({updates: newUpdate})
        this.updateRows()
        let newCount = this.state.totalCount
        newCount += amount
        this.setState({totalCount: newCount})
    }

    render() {
        return (
          <Page fullWidth>
              
                <Layout>
                
                    <Layout.Section>
                        <Heading>Add Entries</Heading>
                        <UpdateForm onClick={this.addProduct}></UpdateForm>
                    </Layout.Section>

                    <Layout.Section>
                        <Heading>Upload File</Heading>
                        <UploadCSV onClick={this.addProduct}>UploadCSV</UploadCSV>
                    </Layout.Section>

                    <Update items={this.state.rows} count={this.state.totalCount}></Update>

                    <Button fullWidth primary>Confirm</Button>
                </Layout>
          </Page>
        );
      }

} 

function Update(props) {

    const initiallySortedRows = Array.isArray(props.items) ? props.items : []

    return (
        <Layout.Section>
            <Heading>Cart</Heading>
            <DataTable columnContentTypes={[
                        'numeric',
                        'text',
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
                        'Stock',
                        'Pending',
                        'Price ($)',
                        'Modify',
                    ]}
                    rows={initiallySortedRows}
                    totals={['', '', '', '', '', '', props.count]}
                    showTotalsInFooter
                />
        </Layout.Section>
    );

} 

function UpdateForm(props) {

    const [pID, setPID] = useState(0);
    const [value, setValue] = useState(0);
    const handleChangeID = useCallback((newValue) => setPID(newValue), []);
    const handleChangeAmount = useCallback((newValue) => setValue(newValue), []);

    const onClick = () => {
        props.onClick(pID, parseInt(value));
    };

    return (
        <Card>
            <TextField label={"Product ID"} type={'number'} value={pID} onChange={handleChangeID} />
            <TextField label={"Amount"} type={'number'} value={value} onChange={handleChangeAmount} />
            <Button onClick={onClick} fullWidth>Add</Button>
        </Card>

    );
}

function UploadCSV(props) {
    const [file, setFile] = useState();

    const handleDropZoneDrop = useCallback(
      (_dropFiles, acceptedFiles, _rejectedFiles) =>
        setFile((file) => acceptedFiles[0]),
      [],
    );

    const fileUpload = !file && <DropZone.FileUpload />;
    const uploadedFile = file && (
      <Stack>
        <Thumbnail
          size="small"
          alt={file.name}
          source={NoteMinor}
        />
        <div>
          {file.name} <Caption>{file.size} bytes</Caption>
        </div>
      </Stack>
    );

    const onClick = () => {
        var reader = new FileReader()
        reader.readAsText(file);

        reader.onload = function() {
            const lines = reader.result.split('\n');
            lines.map(function(line) {
                var newUpdate = line.split(',');
                if(newUpdate.length>=7){
                    props.onClick(newUpdate[0], parseInt(newUpdate[newUpdate.length - 1]));
                }    
            });
          
        };

    };

    return (
        <div>
            <DropZone 
                accept=".csv"
                allowMultiple={false} 
                onDrop={handleDropZoneDrop}
                errorOverlayText="File type must be .csv"
            >
                {uploadedFile}
                {fileUpload}
            </DropZone>
            <Button onClick={onClick} fullWidth>Upload</Button>
        </div>
    );
}

function mapState(state) {
    const { items } = state;
    return { items }
}
  
const actionCreators = {
    fetchAll: itemActions.fetchAll
}

const connected = connect(mapState, actionCreators)(InventoryUpdate);
export  {connected as InventoryUpdate};
