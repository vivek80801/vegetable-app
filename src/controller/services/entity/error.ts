export class MyError {
    errors:string[];
    length: number;
    constructor(){
        this.errors =[];
        this.length = this.errors.length;
    }
    add(error:string){
        this.errors.push(error);
    }
}