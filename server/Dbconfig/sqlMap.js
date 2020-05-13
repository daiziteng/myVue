const dbTool = require('./dbTool');


const getUserInfo = function (cb) {
    dbTool.query(`select * from dataTable`).then(data => {
        if (cb) cb(data)
    })
};






module.exports = {
    getUserInfo
};

