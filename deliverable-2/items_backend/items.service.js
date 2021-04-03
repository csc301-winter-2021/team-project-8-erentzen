const mysql = require('mysql2');
const con = require('./connection').con

module.exports = {
    getAll
}

async function getAll() {
    // add a section where we only select items coming from a specific store, store name will be used to detect it
    const select = `SELECT erentzen.variant.variant_id, item_name, description, price, stock, comleted as completed, quantity
    FROM erentzen.item JOIN erentzen.variant ON erentzen.item.item_id = erentzen.variant.item_id
    LEFT JOIN erentzen.item_order ON erentzen.variant.variant_id = erentzen.item_order.variant_id;`;
    const query = await con.promise().query(select);
    const result = query[0];
    rows = []
    for (i = 0; i < result.length; i++) {
      pending = 0
      if (result[i].quantity != null) {
        if (result[i].completed != null) {
          pending = result[i].quantity - result[i].completed
        } else {
          pending = result[i].quantity
        }
      } else {
        pending = 0
      }
      item = [
          result[i].variant_id,
          result[i].item_name,
          result[i].description,
          result[i].stock,
          pending,
          result[i].price
        ]
      rows.push(item)
    }
    return rows
}

// getAll(function(err,data){
//   if (err) {
//       // error handling code goes here
//       console.log("ERROR : ",err);            
//   } else {            
//       // code to execute on data retrieval
//       console.log("result from db is : ",data);
//       return data   
//   }    
// });
