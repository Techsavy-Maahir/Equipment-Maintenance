import { Request, Response, NextFunction } from "express";
import { type ZodType } from "zod";
declare const app: import("express-serve-static-core").Express;
export declare const validate: (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => void;
export default app;
//# sourceMappingURL=app.d.ts.map