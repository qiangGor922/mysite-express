// 该文件负责对数据库进行一个初始化操作
const sequelize = require("./dbConnect"); // 数据库连接实例

const adminModel = require("./model/adminModel"); // 数据模型
const demoModel = require("./model/demoModel");

const md5 = require("md5");

(async function () {
  // 将数据库模型和表进行同步
  await sequelize.sync({ alter: true });
  // 同步完成后，有一些表是需要一些初始化数据
  // 我们需要先查询这张表有没有内容，没有内容我们才初始化数据
  const adminCount = await adminModel.count();
  if (adminCount === 0) {
    await adminModel.create({
      loginId: "admin",
      name: "超级管理员",
      loginPwd: md5("123456"),
    });
  }
  console.log("数据库初始化成功...");

  const demoCount = await demoModel.count();
  if (demoCount === 0) {
    await demoModel.bulkCreate([
      {
        name: "demo",
        url: "http://www.baidu.com",
        github: "https://github.com/",
        description: "这是一个demo",
        thumb:
          "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
        order: 1,
      },
    ]);
    console.log("demo列表初始化成功...");
  }
})();
