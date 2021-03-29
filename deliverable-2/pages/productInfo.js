import React, { useState , useCallback, useEffect }from 'react';
import { Layout, Page, Tabs, Card, DataTable, MediaCard, Modal } from '@shopify/polaris';
import { connect } from 'react-redux';
import { itemActions } from '../_actions/items.actions';

// WIP

class ProductInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            pid: '12345',
            name: 'Test Product',
            type: 'Test Type',
            amount: 5,
            picture: '',
            description: 'test',
            history: [['Online', 4, 42.99, '2021-02-25'], ['Local', 1, 49.99, '2021-02-28']],
            items: []
        }
    }
    componentDidMount() {
        this.props.fetchAll()
        this.state.items = this.props.items
        console.log(this.state.items)
        console.log(this.props.items)
    }
    

    render(){
        return(
            <Layout>
                <Layout.Section>
                <MediaCard
                    title={'Product ID: ' + this.state.pid}
                    description={''}
                >
                    <img
                        alt=""
                        width="100%"
                        height="100%"
                        style={{
                        objectFit: 'cover',

                        }}
                        src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                    />
                </MediaCard>
                      <Card title={''} sectioned>
                      <span>Name: {this.state.name}</span> <br />
                      <span>In Stock: {this.state.amount}</span> <br />
                      <span>Type: {this.state.type}</span> <br />
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
                            rows={this.state.history}
                            // totals={['', '', '', 255, '$155,830.00']}
                        />
                    </Card>
                </Layout.Section>
            </Layout>
            
        )
    }
}

function mapState(state) {
  const { items } = state;
  return { items }
}

const actionCreators = {
  fetchAll: itemActions.fetchAll
}



export default function ProductModal(props) {
  // const [active, setActive] = useState(false);
  const { active, setActive, name, stock, type, id } = props;
  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <div style={{ height: "500px" }}>
      <Modal
        activator={props.activator}
        open={active}
        onClose={() => setActive(!active)}
        title="Product Info"
        primaryAction={{
          content: "Done",
          onAction: () => setActive(!active)
        }}
      >
        <Modal.Section>
          <MediaCard title={"Product ID: " + id} description={""}>
            <img
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: "cover"
              }}
              src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
            />
          </MediaCard>
          <Card title={"Details"} sectioned>
            <span>Name: {name}</span> <br />
            <span>In Stock: {stock}</span> <br />
            <span>Type: {type}</span> <br />
          </Card>

          <Card title={"Sales History"} sectioned>
            <DataTable
              description={"Sales History"}
              columnContentTypes={["text", "numeric", "numeric", "text"]}
              headings={["Type", "Count", "Price", "Date"]}
              rows={[
                ["Online", 4, 42.99, "2021-02-25"],
                ["Local", 1, 49.99, "2021-02-28"]
              ]}
              // totals={['', '', '', 255, '$155,830.00']}
            />
          </Card>
        </Modal.Section>
      </Modal>
    </div>
  );
}


const connectedproductInfo = connect(mapState, actionCreators)(ProductInfo);
export {connectedproductInfo as ProductInfo };