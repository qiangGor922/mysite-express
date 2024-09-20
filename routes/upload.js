var express = require("express");
var router = express.Router();
const multer = require("multer");
const { formatResponse, uploading } = require("../utils/tool");
const { UploadError } = require("../utils/errors");

router.post("/", async function (req, res, next) {
  // 在single方法里面书写上传控件的name值
  uploading.single("file")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      next(new UploadError("上传失败！"));
    } else {
      res.send(formatResponse(200, "", "/static/uploads/" + req.file.filename));
    }
  });
});

module.exports = router;
