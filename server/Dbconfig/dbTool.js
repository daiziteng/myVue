const { pool } = require('./dbconfig')


const connect2mysql = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err)
            } else return resolve(connection)
        })
    })
}

const query = (sql, condition) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(`mysql链接失败${err}`)
            } else {
                connection.query(sql, (err, result) => {
                    err ? reject(`查询失败${err}`) : resolve(result);
                });
                connection.release()
            }
        })
    })
}

module.exports={
    connect2mysql,
    query,
}