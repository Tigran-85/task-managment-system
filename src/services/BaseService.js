class BaseService {

  constructor() {
  }
      response({
          status = true,
          statusCode = 200,
          data = {},
          message = "",
        }) {
        return {
          status,
          statusCode,
          message,
          data,
        }
      }
};

export default BaseService;