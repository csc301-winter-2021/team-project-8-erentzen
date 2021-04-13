const mysql = require('mysql2');
const con = require('../items_backend/connection').con
var request = require('request-promise');

module.exports = {
    registerStore,
    checkLogin,
    getProducts,
    updateInventory
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


async function updateInventory(shop, location_id, variant_id, count) {
    //Query a variant for its inventory item ID
    // let shop = "erentzen.myshopify.com"
    variant_id = 39638067216551 //test
    let url = 'https://' + shop + `/admin/api/2021-04/variants/${variant_id}.json`
    
    let sql = `SELECT * FROM erentzen.store 
    WHERE store_name = "${shop}";`;
    const result = await con.promise().query(sql);
    if (result[0].length > 0) {
        const token = result[0][0].oauth_code;
        const store_name = result[0][0].store_name
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
            //Retrieve the item's inventory levels
            //const inventory_item_id = 41732686413991
            const inventory_item_id = parsedBody.variant.inventory_item_id
            url = `https://${shop}/admin/api/2021-04/inventory_levels.json?inventory_item_ids=${inventory_item_id}`
            options = {
                method: 'GET',
                uri: url,
                json: true,
                headers: {
                    'X-Shopify-Access-Token': token,
                    'content-type': 'application/json'
                }
            };

            // request(options)
            //     .then(function (parsedBody) {
            //         // Update inventory levels for a product variant
            //         if (parsedBody.inventory_levels[0]) {
            //             // const location_id = location_id
            //             console.log(parsedBody.inventory_levels)
            //             const location_id = parsedBody.inventory_levels[0].location_id
            //             url = 'https://' + shop + `/admin/api/2021-04/inventory_levels/set.json`
            //             options = {
            //                 method: 'POST',
            //                 uri: url,
            //                 json: true,
            //                 headers: {
            //                     'X-Shopify-Access-Token': token,
            //                     'content-type': 'application/json'
            //                 },
            //                 body: JSON.stringify({
            //                     "location_id": location_id,
            //                     "inventory_item_id": inventory_item_id,
            //                     "available": count
            //                 })
            //             };
            //             request(options)
            //             .catch(function (err) {
            //                 console.log(err);
            //             });
            //         }
            //     })
            //     .catch(function (err) {
            //         console.log(err);
            //     });
        })
        .catch(function (err) {
            console.log(err);
        });
    }
    
}

