import {Request, Response, NextFunction} from "express";
import passport from "passport";
import {MyUser} from "./services/entity/user"
import {User} from "../modal/user"

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
    })(req, res, next)
};

export const handleDashboardGet = (req: Request, res: Response) => {
        res.render("dashboard", {user: req.user});
};

export const handleLogoutGet = (req: Request, res: Response) => {

};

export const handleCartGet = (req: Request, res:Response) => {
    if(req.user !== undefined){
        const myUser: any = req.user;
        User.findById({_id: myUser._id}).then((user) => {
            if(user !== null){
                res.render("cart", {cart: user.cart});
            }
        }).catch(err => console.log(err));
    } else {
        res.redirect("/login")
    }
}

export const handleCartPost = (req: Request, res: Response) => {
    interface IReqBody{
        name:string,
        price: number,
        img: string,
        organic: boolean
    }
    const {name, price, img, organic}: IReqBody = req.body;
    if(req.user !== undefined){
        const myUser: any = req.user;
        User.findById({_id: myUser._id}).then((user) => {
            if(user !== null){
                user.cart.push({name, price, img, organic})
                user.save()
            }
        })
        res.json({msg: "vegetable is added to your cart"});
    } else {
        res.redirect("/login")
    }
}