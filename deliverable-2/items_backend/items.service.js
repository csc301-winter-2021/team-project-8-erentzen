// const mysql = require('mysql2');
// const con = require('./connection').con

// module.exports = {
//     getAll,
//     updateInventory
// }

// async function getAll() {
//     const select = `SELECT erentzen.variant.variant_id, item_name, description, price, stock, comleted as completed, quantity
//     FROM erentzen.item JOIN erentzen.variant ON erentzen.item.item_id = erentzen.variant.item_id
//     LEFT JOIN erentzen.item_order ON erentzen.variant.variant_id = erentzen.item_order.variant_id;`;
//     const query = await con.promise().query(select);
//     const result = query[0];
//     rows = []
//     for (i = 0; i < result.length; i++) {
//       pending = 0
//       if (result[i].quantity != null) {
//         if (result[i].completed != null) {
//           pending = result[i].quantity - result[i].completed
//         } else {
//           pending = result[i].quantity
//         }
//       } else {
//         pending = 0
//       }
//       item = [
//           result[i].variant_id,
//           result[i].item_name,
//           result[i].description,
//           result[i].stock,
//           pending,
//           result[i].price
//         ]
//       rows.push(item)
//     }
//     return rows
// }

// async function updateInventory(id, count) {
//   const sql = `update erentzen.variant set stock = ${count} where variant_id = ${id};`
//   await con.promise().query(sql);
//   return "Update Success"
// }

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

const mysql = require('mysql2');
const con = require('./connection').con

module.exports = {
    getAll,
    updateInventory,
    getRecentOrder
}

async function getAll(store) {
    // add a section where we only select items coming from a specific store, store name will be used to detect it
    const findStore = `SELECT * FROM erentzen.store
    WHERE store_name = "${store}";`;
    const storeQuery = await con.promise().query(findStore);
    const storeResult = storeQuery[0];
    if (storeResult.length <= 0) {
      // error no store found
      console.log("no such store exists")
    } else {
      let store_id = storeResult[0].store_id;
      const itemQuery = `SELECT erentzen.variant.variant_id, item_name, description, price, stock, comleted as completed, quantity
      FROM erentzen.item JOIN erentzen.variant
      ON erentzen.item.item_id = erentzen.variant.item_id 
      LEFT JOIN erentzen.item_order ON erentzen.variant.variant_id = erentzen.item_order.variant_id 
      WHERE erentzen.item.store_id = ${store_id};`;

      const itemResults = await con.promise().query(itemQuery);
      const result = itemResults[0];
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
            // item_id?
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
}

async function getRecentOrder(){
    const select = `SELECT order_id, item_name, description, quantity, data_time  from erentzen.variant JOIN erentzen.item_order ON erentzen.variant.variant_id = erentzen.item_order.variant_id LEFT JOIN erentzen.item ON erentzen.variant.item_id = erentzen.item.item_id;`;
    const query = await con.promise().query(select);
    const result = query[0];
    rows = []
    for (i = 0; i < result.length; i++) {
      order = [
          result[i].order_id,
          result[i].item_name,
          result[i].description,
          result[i].quantity,
          result[i].data_time,
        ]
      rows.push(order)
    }
    return rows
}

async function updateInventory(id, count) {
  const sql = `update erentzen.variant set stock = ${count} where variant_id = ${id};`
  await con.promise().query(sql);
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