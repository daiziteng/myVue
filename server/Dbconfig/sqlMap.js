const dbTool = require('./dbTool');


const getUserInfo = function (cb) {
    dbTool.query(`select * from users`).then(data => {
        if (cb) cb(data)
    })
}





module.exports = {
    getUserInfo
};

