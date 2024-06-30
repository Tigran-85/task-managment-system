import ApiError from "../exceptions/apiErrors.js";
import tokenService from "../services/TokenService.js";

export default async function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateToken(accessToken, process.env.JWT_ACCESS_TOKEN);

        if (!userData) {
            return next(ApiError.InvalidTokenError());
        }
        
        req.user = userData;
        next();
    } catch (error) {
        return next(ApiError.UnauthorizedError());
    }
}