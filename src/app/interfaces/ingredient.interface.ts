//type safety - data is used and manipulated in a consistent and predicatble manner based on its data type
//e.g you cannot assign a string value to a variable declared as a number
//you cannot perform arithmentic operations on variables of incompatible data types (e.g adding a string and a number)
export interface Ingredient{
    //this property is optional
    id?:number;
    name:string;
    quantity:string;
    unit:string;
    expirationDate:string;
    category:string;
    notes:string;
}