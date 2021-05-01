import {Request, Response} from "express";

export const handleIndexGet = (req:Request, res:Response) => {
    res.render("index")
}

export const handleAboutGet = (req:Request, res: Response)=> {
    res.render("about")
}

export const handleSignupPost = (req: Request, res: Response) => {
    console.log(req.body);
    res.redirect("/login");
}

export const handleLoginGet = (req: Request, res: Response) => {
    res.render("login")
}

export const handleLoginPost = (req: Request, res: Response) => {
    console.log(req.body)
    res.redirect("/dashboard")
}

export const handleDashboardGet = (req: Request, res: Response) => {
    res.render("dashboard")
}