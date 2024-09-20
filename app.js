// 引包
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const md5 = require("md5");
var expressJWT = require("express-jwt");
const {
  ForbiddenError,
  ServiceError,
  UnknownError,
} = require("./utils/errors");

// 引入环境变量
require("dotenv").config();

// 引入数据库连接
require("./dao/db");

// 引入跨域中间件
var cors = require("cors");

// 引入路由
var adminRouter = require("./routes/admin");
var demoRouter = require("./routes/demo");
var uplaodRouter = require("./routes/upload");

// 创建服务器实例
var app = express();
// 处理跨域
app.use(cors({ origin: "http://localhost:922" }));
// 使用各种各样的中间件
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 配置验证 token 接口
app.use(
  expressJWT
    .expressjwt({
      secret: md5(process.env.JWT_SECRET),
      algorithms: ["HS256"],
    })
    .unless({
      path: [
        {
          url: "/api/admin/login",
          methods: ["POST"],
        },
        {
          url: "/api/demo/list",
          methods: ["GET"],
        },
      ],
    })
);

// 使用路由中间件
app.use("/api/admin", adminRouter);
app.use("/api/demo", demoRouter);
app.use("/api/upload", uplaodRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理函数
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // 抛出自定义错误
    res.send(new ForbiddenError("登录失效").toResponseJSON());
  } else if (err instanceof ServiceError) {
    res.send(err.toResponseJSON());
  } else {
    res.send(new UnknownError().toResponseJSON());
  }
});

module.exports = app;
