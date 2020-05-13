const express = require("express");
const router = express.Router();
const sqlMap = require('../Dbconfig/sqlMap')
const db = require('../Dbconfig/dbTool')


router.get('/getdata', (req, res) => {
    sqlMap.getUserInfo(data => {
        res.send(data)
    })
})

// 增
router.post('/tableData', (req, res) => {
    let date = req.body.date;
    let name = req.body.name;
    let address = req.body.address;
    db.query(`insert into datatable (date,name,address) values ('${date}','${name}','${address}')`).then(data => {
        res.send({ status: 200, msg: '新增成功' })
    }).catch(error => console.log('caught', error))
})
// 改
router.post('/update/tableData', (req, res) => {
    let id = req.body.id;
    let date = req.body.date;
    let name = req.body.name;
    let address = req.body.address;
    // console.log(req.body)
    db.query(`update  datatable set date='${date}',name='${name}',address='${address}' where id='${id}'`).then(data => {
        res.send({ status: 200, msg: '修改成功' })
    }).catch(error => console.log('caught', error))
})
// 删
router.post('/delete/tableData', (req, res) => {
    let id = req.body.id;
    db.query(`delete from datatable where id='${id}'`).then(data => {
        res.send({ status: 200, msg: '修改成功' })
    }).catch(error => console.log('caught', error))
})











module.exports = router;