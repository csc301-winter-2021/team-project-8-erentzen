const mysql = require('mysql2');
const con = require('../items_backend/connection').con

module.exports = {
    registerStore,
    checkLogin
}

async function registerStore(name, id, oauth) {
    try {
        // check if already in table
        let sql = `SELECT * FROM erentzen.store
        WHERE store_id = ${id};`;
        const results = await con.promise().query(sql);
        if (results[0].length > 0) { // already exists, check oauth
            if (results[0][0].oauth_code !== oauth) { // update oauth if oauth not the same
                sql = `UPDATE erentzen.store
                        SET oauth_code = '${oauth}'
                        WHERE store_id = ${id};`;
                await con.promise().query(sql)
            }
        } else { // does not exists so we add into table
            console.log("adding new data")
            sql = `INSERT INTO erentzen.store (store_id, store_name, oauth_code)
                        VALUES (${id}, '${name}', '${oauth}');`;
            await con.promise().query(sql);
        }
        
        sql = `SELECT * FROM erentzen.store;`;
        const d = await con.promise().query(sql);
        // console.log(d)

        // return the user in the future


    } catch (e) {
        console.log(e)
    }
}

async function checkLogin(app_id) {
    try {
        console.log("reached check login")
        let sql = `SELECT * FROM erentzen.store
        WHERE store_id = ${app_id};`;
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