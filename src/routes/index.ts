import { Router } from "express";
import movieRouter from './movies.Router.js';
import userRouter from './user.router.js';


const router = Router();

router.use("/movies", movieRouter);
router.use("/users", userRouter);


export default router;