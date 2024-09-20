var express = require("express");
var router = express.Router();
const { analysisToken } = require("../utils/tool");

const { loginService } = require("../service/adminService");
const { formatResponse } = require("../utils/tool");

// 登录
router.post("/login", async function (req, res, next) {
  const result = await loginService(req.body);
  if (result.token) {
    res.setHeader("Authorization", result.token);
  }
  res.send(formatResponse(200, "", result.data));
});

// 恢复登录状态
router.get("/whoami", async function (req, res, next) {
  // 从客户端请求拿到token 解析token
  const token = analysisToken(req.get("Authorization"));
  res.send(
    formatResponse(200, "", {
      loginId: token.loginId,
      name: token.name,
      id: token.id,
    })
  );
});

module.exports = router;
