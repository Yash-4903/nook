import type { JwtPayload } from "../utils/auth.middleware.js";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export {};