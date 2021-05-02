import { IUser } from "../../../modal/user";
import { MyError } from "./error";
import {saveVegetableToDatabase} from "../microservices/vegetable"

export class Vegetable {
    name:string;
    price: number;
    organic: boolean;
    img: string;
    owner: IUser;
    constructor(name:string, price: number, organic:boolean, img: string, owner: IUser){
        this.name = name;
        this.price = price;
        this.organic = organic;
        this.img = img;
        this.owner = owner;
    }
    validate(){
        const errors = new MyError();
        if(this.name.length < 5){
            errors.add("name can not be less than 5 characters");
        } else if(this.name.length > 10){
            errors.add("name can not be more than 10 characters");
        } else if(errors.length > 0){
            return errors.errors;
        }else{
            return "valid vegetable";
        }
    }
    save(){
        saveVegetableToDatabase(this.name, this.price, this.organic, this.img, this.owner)
    }
}