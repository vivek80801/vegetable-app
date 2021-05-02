import { Request, Response } from "express";
import {Vegetable} from "./services/entity/vegetable"
import {upload} from "./services/microservices/vegetable"
import { Vegetable as MVegetable} from "../modal/vegetable";

export const handleVegetableGet = (req: Request, res: Response) => {
    MVegetable.find().then((vegetables) => {
        res.render("vegetable", {vegetables: vegetables});
    }).catch(err => console.log(err))
};

export const handleVegtableCreateGet = (req: Request, res: Response) => {
    res.render("createvegetable");
};

export const handleVegetableCreatePost = (req: Request, res: Response) => {
    interface IReqBody {
        name: string;
        price: number;
        organic: "yes" | "no";
    }
    upload(req, res, (err:any) => {
    const {name, price, organic}: IReqBody = req.body;
    const isOrganic = organic === "yes"? true: false;
    const img = req.file;
    if(req.user !== undefined){
        const myUser:any = req.user
        const newVegetable = new Vegetable(name, price, isOrganic, img.filename, myUser)
        if(newVegetable.validate() === "valid vegetable"){
                if(err){
                    return res.render("createvegetable", {msg:err})
                }else{
                    newVegetable.save()
                    res.redirect("/vegetable")
                }
            }else{
                const errors = newVegetable.validate()
                if(errors === undefined){
                }else {
                    console.log("error is undefined")
                    console.log(errors)
                }
                res.redirect("/dashboard")
            }
    }
    })
}