import React, {useCallback, useState} from 'react';
import {Card, DataTable, Page,Button, TextField, Layout, DropZone,Stack, Thumbnail,Caption, FormLayout} from '@shopify/polaris';
import { connect } from 'react-redux';
import { itemActions } from '../_actions/items.actions';
import {NoteMinor} from '@shopify/polaris-icons';
import ReactTooltip from 'react-tooltip';
import {FaInfoCircle} from 'react-icons/fa';

class InventoryUpdate extends React.Component {
    state = {};
    
    constructor(props) {
      super(props);
      this.state = {
        rows: [],
        updates: {},
        totalCount: 0,
      };
    }

    componentDidMount() {
        this.props.fetchAll()
    }

    getInfo(id) {
        const tmp = Array.isArray(this.props.items.items) ? this.props.items.items : []
        for(let i = 0; i < tmp.length; i++){
            if(this.props.items.items[i][0] == id){
                return [...this.props.items.items[i]]
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
                amount = 0
                alert('id does not exist')
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

    handleConfirm= () => {
        for (var id in this.state.updates){
            const newCount = this.state.updates[id][6] + this.getInfo(id)[3]
            if (newCount < 0){
                alert(`Product ${id} has negative count`)
            }else{
                itemActions.updateInventory(id, newCount)
            }
        }
        this.clear()
        
    }

    clear = () => {

        this.setState({rows: [], updates: {}, totalCount: 0})
    }

    render() {
        return (
          <Page fullWidth>
              
                <Layout>
                    <Layout.Section>
                        <UpdateForm onClick={this.addProduct}></UpdateForm>
                    </Layout.Section>

                    <Layout.Section>
                        <UploadCSV onClick={this.addProduct}>UploadCSV</UploadCSV>
                    </Layout.Section>

                    <Layout.Section>
                        <Update items={this.state.rows} count={this.state.totalCount}></Update>
                    </Layout.Section>

                    <Layout.Section>
                        <Button onClick={this.clear} plain>Clear</Button>
                        <Button onClick={this.handleConfirm} fullWidth primary>Confirm</Button>
                    </Layout.Section>

                </Layout>
          </Page>
        );
      }

} 

function Update(props) {

    const initiallySortedRows = Array.isArray(props.items) ? props.items : []

    return (
        <Card title='Cart'>
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
        </Card>
    );

} 

function UpdateForm(props) {

    const [pID, setPID] = useState(0);
    const [value, setValue] = useState(0);
    const handleChangeID = useCallback((newValue) => setPID(newValue), []);
    const handleChangeAmount = useCallback((newValue) => setValue(newValue), []);

    const onClick = () => {
        setPID('')
        setValue('')
        props.onClick(pID, parseInt(value));
    };

    return (
        <Card 
        title={
            <>  
            <h2 className="Polaris-Heading" style={{display: 'inline'}}>Add Entries &nbsp;</h2>
            <a data-tip data-for='add'><FaInfoCircle></FaInfoCircle></a>
            <ReactTooltip id='add' type='info'>
                <span>Update existing items' stock here using their id</span>
            </ReactTooltip>
            </>
        }
        sectioned>
            <FormLayout>
                <TextField label={"Product ID"} type={'number'} value={pID} onChange={handleChangeID} />
                <TextField label={"Amount"} type={'number'} value={value} onChange={handleChangeAmount} />
                <Stack distribution="trailing">
                    <Button onClick={onClick} primary>Add</Button>
                </Stack>
            </FormLayout>

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
                    setFile(null)
                    props.onClick(newUpdate[0], parseInt(newUpdate[newUpdate.length - 1]));
                }    
            });
          
        };

    };

    return (
        <Card
         title={
            <>  
            <h2 className="Polaris-Heading" style={{display: 'inline'}}>Upload File &nbsp;</h2>
            <a data-tip data-for='files'><FaInfoCircle></FaInfoCircle></a>
            <ReactTooltip id='files' type='info'>
                <span>File should be formatted as 'ID, Product, Variant, Stock, Pending, Price ($)'</span>
            </ReactTooltip>
            </>
         }
         sectioned
         >
            <FormLayout >
                <DropZone 
                    accept=".csv"
                    allowMultiple={false} 
                    onDrop={handleDropZoneDrop}
                    errorOverlayText="File type must be .csv"
                >
                    {uploadedFile}
                    {fileUpload}
                </DropZone>
                <Stack distribution="trailing">
                    <Button onClick={onClick} primary>Upload</Button>
                </Stack>
            </FormLayout>
            
        </Card>
    );
}

function mapState(state) {
    const { items } = state;
    return { items }
}
  
const actionCreators = {
    fetchAll: itemActions.fetchAll,
    updateInventory: itemActions.updateInventory
}

const connected = connect(mapState, actionCreators)(InventoryUpdate);
export  {connected as InventoryUpdate};
