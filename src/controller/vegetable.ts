import { Request, Response } from "express";
import {Vegetable} from "./services/entity/vegetable"
import {upload} from "./services/microservices/vegetable"

export const handleVegetableGet = (req: Request, res: Response) => {
    res.render("vegetable");
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
    const img = req.file
    const newVegetable = new Vegetable(name, price, isOrganic, img.filename )
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
    })
}