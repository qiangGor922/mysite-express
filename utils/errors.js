// 自定义错误
// 当错误发生的时候，我们捕获到发送的错误，然后抛出我们自定义的错误

const { formatResponse } = require("./tool");

/**
 * 业务处理错误基类
 * @param {*} message 错误信息
 * @param {*} code 错误状态码
 */
class ServiceError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }

  // 格式化的返回错误信息
  toResponseJSON() {
    return formatResponse(this.code, this.message, null);
  }
}

// 文件上传错误
exports.UploadError = class extends ServiceError {
  constructor(message) {
    super(message, 413);
  }
};
// 禁止访问错误
exports.ForbiddenError = class extends ServiceError {
  constructor(message) {
    super(message, 401);
  }
};
// 验证错误
exports.ValidationError = class extends ServiceError {
  constructor(message) {
    super(message, 406);
  }
};
// 无资源错误(404)
exports.NotFoundError = class extends ServiceError {
  constructor() {
    super("NOT FOUND", 404);
  }
};
// 未知错误
exports.UnknownError = class extends ServiceError {
  constructor() {
    super("SERVER INTERNAL ERROR", 500);
  }
};

module.exports.ServiceError = ServiceError;

// throw new ServiceError('用户不存在', 404);
