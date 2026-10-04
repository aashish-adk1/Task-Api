import { RequestHandler } from "express";
import { ZodType } from "zod";

type ValidateTarget = "body" | "params" | "query";

export const validate = (
  schema: ZodType,
  target: ValidateTarget
): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
      });
    }

    req[target] = result.data;

    next();
  };
};