import {Request, Response, NextFunction} from "express";
import passport from "passport";
import {MyUser} from "./services/entity/user"

export const handleIndexGet = (req:Request, res:Response) => {
    res.render("index");
};

export const handleAboutGet = (req:Request, res: Response)=> {
    res.render("about");
};

export const handleSignupPost = (req: Request, res: Response) => {
    interface IReqUser {
        username: string;
        email:string;
        password: string;
        category: string;
    }
    const {username, email, password, category}:IReqUser = req.body;
    const newUser = new MyUser(username, email, password, category);
    if(newUser.validate() === "valid user"){
        newUser.save();
        res.redirect("/login");
    } else {
        const errors = newUser.validate();
        res.redirect("/");
    }
};

export const handleLoginGet = (req: Request, res: Response) => {
    res.render("login");
};

export const handleLoginPost = (req: Request, res: Response, next:NextFunction) => {
    passport.authenticate("local", {
        failureRedirect:"/login",
        successRedirect:"/dashboard"
    })(req, res, next);
};

export const handleDashboardGet = (req: Request, res: Response) => {
        res.render("dashboard", {user: req.user});
};

export const handleLogoutGet = (req: Request, res: Response) => {

};