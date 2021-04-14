const mysql = require('mysql2');
const con = require('../items_backend/connection').con
var request = require('request-promise');

module.exports = {
    registerStore,
    checkLogin,
    getProducts,
    updateInventory
}

async function registerStore(name, oauth) {
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
            sql = `INSERT INTO erentzen.store (store_name, oauth_code)
                        VALUES ('${name}', '${oauth}');`;
            await con.promise().query(sql);
        }
        // sql = `SELECT * FROM erentzen.item;`;
        // const d = await con.promise().query(sql);
        // console.log(d)

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
            return true
        } else {
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
        const store_id = result[0][0].store_id;
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
            .then(async function (parsedBody) {
                console.log(parsedBody);

                // get all the items in the current database
                let sql_items = `select item_id from erentzen.item
                where store_id = ${store_id};`;

                let items = []
                const items_results = await con.promise().query(sql_items);
                for (let i = 0; i < items_results[0].length; i += 1) {
                    items.push(items_results[0][i].item_id)
                }

                let shopify_ids = [];

                for (let i = 0; i < parsedBody.products.length; i += 1) {
                    let item = parsedBody.products[i];
                    shopify_ids.push(item.id)
                    if (!items.includes(item.id)) { // item from shopify not in our db
                        const sql_add_item = `INSERT INTO erentzen.item VALUES (${item.id}, "${item.title}", ${store_id}, ${1});`;
                        await con.promise().query(sql_add_item);
                    }

                    // also need to loop over variants to add
                    const sql_variants = `select * from erentzen.variant where item_id = ${item.id};`;
                    const variants_results = await con.promise().query(sql_variants);
                    let variants = []
                    for (let j = 0; j < variants_results[0].length; j += 1) {
                        variants.push(variants_results[0][j].variant_id)
                    }

                    for (let j = 0; j < item.variants.length; j += 1) {
                        let variant = item.variants[j];
                        if (!variants.includes(variant.id)) {
                            // add variant into the db
                            let title = '';
                            if (variant.title !== 'Default Title') {
                                title = variant.title + " " + item.title;
                            } else {
                                title = item.title;
                            }
                            const sql_add_variant = `INSERT INTO erentzen.variant VALUES (${variant.id},${item.id}, "${title}", ${variant.price}, ${variant.inventory_quantity});`;
                            await con.promise().query(sql_add_variant);

                        } else { // if it exists we check if stock is the same
                            const sql_variant_id = `select * from erentzen.variant where variant_id = ${variant.id};`;
                            const variant_res = await con.promise().query(sql_variant_id);
                            console.log(variant.inventory_quantity, variant_res[0][0].stock)
                            if (variant.inventory_quantity !== variant_res[0][0].stock || variant.price !== variant_res[0][0].price) { // if stock level differs update
                                console.log("need to update stock level for:", variant.id)
                                const sql_update_var = `UPDATE erentzen.variant SET stock = ${variant.inventory_quantity}, price = ${variant.price}
                                WHERE variant_id = ${variant.id};`;
                                await con.promise().query(sql_update_var);
                            }
                        }
                    }



                    // console.log("item from shopify:", item)
                }

                // delete all the items that have been deleted from shopify
                for (let i = 0; i < items.length; i += 1) {
                    if (!shopify_ids.includes(items[i])) { // item is not in shopify store anymore
                        const sql_delete_var = `DELETE FROM erentzen.variant WHERE item_id = ${items[i]};`
                        const sql_delete_item = `DELETE FROM erentzen.item WHERE item_id = ${items[i]};`
                        await con.promise().query(sql_delete_var)
                        await con.promise().query(sql_delete_item)
                    }
                }

            })
            .catch(function (err) {
                console.log(err);
            });
    }
}


async function updateInventory(shop, variant_id, count) {
    //Query a variant for its inventory item ID
    // let shop = "erentzen.myshopify.com"
    let url = 'https://' + shop + `/admin/api/2021-04/variants/${variant_id}.json`

    let sql = `SELECT * FROM erentzen.store 
    WHERE store_name = "${shop}";`;
    const result = await con.promise().query(sql);

    if (result[0].length > 0) {
        const token = result[0][0].oauth_code
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
                request(options)
                    .then(function (parsedBody) {
                        // Update inventory levels for a product variant
                        // for store not opening location option
                        const location_id = parsedBody.inventory_levels[0].location_id
                        url = 'https://' + shop + `/admin/api/2021-04/inventory_levels/set.json`
                        options = {
                            method: 'POST',
                            uri: url,
                            json: true,
                            headers: {
                                'X-Shopify-Access-Token': token,
                                'content-type': 'application/json'
                            },
                            body: {
                                "location_id": location_id,
                                "inventory_item_id": inventory_item_id,
                                "available": count
                            }
                        };

                        request(options)
                        .catch(function (err) {
                            console.log(err);
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

}

