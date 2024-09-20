const {
  demoDao,
  updateDemoDao,
  deleteDemoDao,
  editDemoDao,
} = require("../dao/demoDao");
const { formatResponse } = require("../utils/tool");

module.exports.demoService = async function () {
  // 1.调用dao层
  let data = await demoDao();
  // 2.返回数据
  return data;
};

module.exports.updateDemoService = async function (params) {
  // 1.调用dao层
  let data = await updateDemoDao(params);
  // 2.返回数据
  return data;
};

module.exports.deleteDemoService = async function (params) {
  // 1.调用dao层
  let data = await deleteDemoDao(params);
  // 2.返回数据
  return data;
};

module.exports.editDemoService = async function (params) {
  // 1.调用dao层
  let data = await editDemoDao(params);
  // 2.返回数据
  return data;
};
