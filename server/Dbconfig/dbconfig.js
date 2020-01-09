const mysql = require('mysql')

// 连接池

const mysqlConfig = {
    host: 'localhost',
    port: 3306,
    database: 'myvue',
    user: 'root',
    password: '123456',
};

let pool = mysql.createPool(mysqlConfig)


module.exports = {
    pool
}