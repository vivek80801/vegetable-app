import bcrypt from "bcryptjs";
import {User} from "../../../modal/user";

export const saveUserToDatabase = (username: string, email: string, password:string, category: string) => {
    const newUser = new User({
        username,
        email,
        password,
        category,
    });
    bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(newUser.password, salt).then((hash) => {
            newUser.password = hash;
            newUser.save().then((user) => console.log("user is saved to database")).catch(err => console.log(err));
        });
    }).catch(err => console.log(err));
};
