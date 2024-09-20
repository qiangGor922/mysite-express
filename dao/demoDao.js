const { formatResponse } = require("../utils/tool");
const demoModel = require("./model/demoModel");

module.exports.demoDao = async function () {
  return await demoModel.findAll();
};

module.exports.updateDemoDao = async function (params) {
  return await demoModel.create(params);
};

module.exports.deleteDemoDao = async function (params) {
  return await demoModel.destroy({
    where: params,
  });
};

module.exports.editDemoDao = async function (params) {
  return await demoModel.update(params, {
    where: {
      id: params.id,
    },
  });
};
