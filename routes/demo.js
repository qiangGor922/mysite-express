var express = require("express");
const {
  demoService,
  updateDemoService,
  deleteDemoService,
  editDemoService,
} = require("../service/demoService");
var router = express.Router();
const { handleDataPattern, formatResponse } = require("../utils/tool");

router.get("/list", async function (req, res, next) {
  res.send(formatResponse(200, "", handleDataPattern(await demoService())));
});

router.post("/update", async function (req, res, next) {
  await updateDemoService(req.body);
  res.send(formatResponse(200, "添加成功", true));
});

router.post("/delete", async function (req, res, next) {
  await deleteDemoService(req.body);
  res.send(formatResponse(200, "删除成功", true));
});

router.post("/edit", async function (req, res, next) {
  try {
    await editDemoService(req.body);
    res.send(formatResponse(200, "编辑成功", true));
  } catch (err) {
    res.send(formatResponse(500, err.errors[0].message, null));
  }
});

module.exports = router;
