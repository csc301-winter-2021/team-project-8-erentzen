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

async function getAll() {
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

async function getRecentOrder(){
    // const select = 'SELECT order_id, item_name,erentzen.variant.variant_id, description, quantity'
    const select = `SELECT order_id, erentzen.variant.variant_id, item_name, description, comleted as completed, quantity
    FROM erentzen.item JOIN erentzen.variant ON erentzen.item.item_id = erentzen.variant.item_id
    LEFT JOIN erentzen.item_order ON erentzen.variant.variant_id = erentzen.item_order.variant_id;`;
    const query = await con.promise().query(select);
    const result = query[0];
    rows = []
    for (i = 0; i < result.length; i++) {
      order = [
          // item_id?
          result[i].order_id,
          result[i].item_name,
          result[i].description,
          result[i].quantity
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