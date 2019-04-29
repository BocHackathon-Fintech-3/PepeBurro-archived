import { Request, Response } from "express";
import { verifyEmail } from "../rest/auth";
import { ErrorCode } from "../interfaces/enum";
import { resendEmailVerification } from "../crud/email";
import { addEmailToUser, deleteEmailFromUser } from "../rest/email";

export const routeEmailAdd = async (req: Request, res: Response) => {
  const email = req.body.email;
  if (!email) throw new Error(ErrorCode.MISSING_FIELD);
  await addEmailToUser(res.locals.token.id, email, res.locals);
  res.json({ success: true });
};

export const routeEmailDelete = async (req: Request, res: Response) => {
  const emailId = req.params.id;
  if (!emailId) throw new Error(ErrorCode.MISSING_FIELD);
  await deleteEmailFromUser(emailId, res.locals.token.id, res.locals);
  res.json({ success: true });
};

export const routeEmailVerify = async (req: Request, res: Response) => {
  await verifyEmail(req.body.token || req.params.token, res.locals);
  res.json({ success: true });
};

export const routeEmailVerifyResend = async (req: Request, res: Response) => {
  const emailId = req.params.id || req.body.id;
  if (!emailId) throw new Error(ErrorCode.MISSING_FIELD);
  await resendEmailVerification(emailId);
  res.json({ success: true });
};