import { Router } from "express";
import { handleIndexGet, handleLoginGet, handleLoginPost, handleSignupPost, handleAboutGet, handleDashboardGet } from "../controller/index";
import {isAuth} from "../controller/services/auth"

export const mainRouter = Router();

mainRouter.get("/", handleIndexGet);
mainRouter.get("/about", handleAboutGet);
mainRouter.get("/login", handleLoginGet);
mainRouter.get("/dashboard", isAuth, handleDashboardGet);
mainRouter.post("/signup", handleSignupPost);
mainRouter.post("/login", handleLoginPost);