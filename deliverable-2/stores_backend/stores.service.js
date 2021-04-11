const mysql = require('mysql2');
const con = require('../items_backend/connection').con
var request = require('request-promise');

module.exports = {
    registerStore,
    checkLogin,
    getProducts
}

async function registerStore(name, id, oauth) {
    try {
        // check if already in table
        let sql = `SELECT * FROM erentzen.store
        WHERE store_name = "${name}";`;
        const results = await con.promise().query(sql);
        if (results[0].length > 0) { // already exists, check oauth
            if (results[0][0].oauth_code !== oauth) { // update oauth if oauth not the same
                sql = `UPDATE erentzen.store
                        SET oauth_code = '${oauth}'
                        WHERE store_name = "${name}";`;
                await con.promise().query(sql)
            }
        } else { // does not exists so we add into table
            sql = `INSERT INTO erentzen.store (store_id, store_name, oauth_code)
                        VALUES (${id}, '${name}', '${oauth}');`;
            await con.promise().query(sql);
        }
        sql = `SELECT * FROM erentzen.store;`;
        const d = await con.promise().query(sql);
        console.log(d)

        // return the user in the future
    } catch (e) {
        console.log(e)
    }
}


// Check if store has already been registered into our database
async function checkLogin(name) {
    try {
        let sql = `SELECT * FROM erentzen.store
        WHERE store_name = "${name}";`;
        const results = await con.promise().query(sql);

        if (results[0].length > 0) {
            console.log("returning true")
            return true
        } else {
            console.log("returning false")
            return false
        }
    } catch (e) {
        console.log(e)
    }

}

// actual syncing of our database with shopify's 
async function getProducts(shop) {
    // let shop = "erentzen.myshopify.com"
    let url = 'https://' + shop + '/admin/products.json';
    let sql = `SELECT * FROM erentzen.store 
    WHERE store_name = "${shop}";`;
    const result = await con.promise().query(sql);
    if (result[0].length > 0) {
        console.log("results:", result[0])
        const token = result[0][0].oauth_code;
        const store_name = result[0][0].store_name

        // Use shopify api to get the products from their store
        let options = {
            method: 'GET',
            uri: url,
            json: true,
            headers: {
                'X-Shopify-Access-Token': token,
                'content-type': 'application/json'
            }
        };

        request(options)
            .then(function (parsedBody) {
                console.log(parsedBody);
                // loop through the items in parsed body
                // loop through the variants in items
                // check if id is in our variant table 
                // if not then store new item into our db
                // if yes then update stock and price if needed
                console.log(parsedBody.products[0].variants)

            })
            .catch(function (err) {
                console.log(err);
            });
        }  
}
