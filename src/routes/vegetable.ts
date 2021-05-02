import {Router} from "express";
import { handleVegetableGet, handleVegtableCreateGet, handleVegetableCreatePost } from "../controller/vegetable";
import { isAuth } from "../controller/services/auth";

export const vegetableRouter = Router();

vegetableRouter.get("/", isAuth, handleVegetableGet);
vegetableRouter.get("/create", isAuth, handleVegtableCreateGet);
vegetableRouter.post("/create", isAuth, handleVegetableCreatePost)