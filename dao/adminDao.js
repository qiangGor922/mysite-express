// 这一层复制和数据库打交道
const adminModel = require("./model/adminModel");

// 登录
module.exports.loginDao = async function (loginInfo) {
  console.log(loginInfo, "a");
  return await adminModel.findOne({
    where: {
      loginId: loginInfo.loginId,
      loginPwd: loginInfo.loginPwd,
    },
  });
};
