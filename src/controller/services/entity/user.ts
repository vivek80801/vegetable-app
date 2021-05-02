import {MyError} from "./error";
import {saveUserToDatabase} from "../microservices/user";

export class MyUser {
    username: string;
    email: string;
    password: string;
    category: string;
    constructor(username: string, email: string, password: string, category:string){
        this.username = username;
        this.password = password;
        this.email = email;
        this.category = category;
    }
    validate(){
        const errors = new MyError();
        if (this.username.length < 5) {
            errors.add("username can not be less then 5 characters");
        } else if(this.username.length > 10) {
            errors.add("username can not be more than 10 characters");
        } else if(this.password.length < 5){
            errors.add("password can not be less than 5 characters");
        } else if(this.password.length > 10){
            errors.add("password can not be more than 10 characters");
        } else if(errors.length > 0){
            return errors.errors;
        }else{
            return "valid user";
        }
    }
    save(){
        saveUserToDatabase(this.username, this.email, this.password, this.category);
    }
}