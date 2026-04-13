import { Router, type IRouter } from "express";
import healthRouter from "./health";
import notifyRouter from "./notify";
import partnerRegisterRouter from "./partner-register";

const router: IRouter = Router();

router.use(healthRouter);
router.use(notifyRouter);
router.use(partnerRegisterRouter);

export default router;
