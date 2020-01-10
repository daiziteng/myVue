var express = require("express");

var indexRouter = require("./router/index");
var loginRouter = require("./router/login");

var app = express();

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// app.use(function (req, res, next) {
//     console.log(req.url)
// });

var bodyParser = require("body-parser");
app.use(
    bodyParser.json({
        limit: "500mb"
    })
);
app.use(
    bodyParser.urlencoded({
        limit: "500mb",
        extended: true
    })
);

//app.use(logger("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use("/", indexRouter);
app.use("/", loginRouter);

//启动监听
app.listen(3000, function () {
    console.log("监听成功3000");
});
