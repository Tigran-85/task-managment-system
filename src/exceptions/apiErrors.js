import { ERROR_MESSAGES } from "../common/validationMessage.js";

class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, ERROR_MESSAGES.UNAUTHORIZED);
    }

    static InvalidTokenError() {
        return new ApiError(401, ERROR_MESSAGES.INVALID_TOKEN);
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}

export default ApiError;