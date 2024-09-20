// admin模块业务逻辑层

const md5 = require("md5");
const { loginDao } = require("../dao/adminDao");
const jwt = require("jsonwebtoken");

module.exports.loginService = async function (loginInfo) {
  loginInfo.loginPwd = md5(loginInfo.loginPwd);
  // 接下来进行数据的验证，也就是查询该条数据在数据库里面有没有
  let data = await loginDao(loginInfo);
  if (data && data.dataValues) {
    // 添加token
    data = {
      id: data.dataValues.id,
      loginId: data.dataValues.loginId,
      name: data.dataValues.name,
    };
    var loginPeriod;
    if (loginInfo.remember) {
      // 自定义过期时间
      loginPeriod = parseInt(loginInfo.remember);
    } else {
      // 默认过期时间
      loginPeriod = 1;
    }
    // 生成token
    const token = jwt.sign(
      {
        id: data.id,
        loginId: data.loginId,
        name: data.name,
      },
      md5(process.env.JWT_SECRET),
      { expiresIn: 60 * 60 * 24 * loginPeriod }
    );
    return { data, token };
  }
  return { data };
};
