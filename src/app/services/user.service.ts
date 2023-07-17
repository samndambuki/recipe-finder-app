import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interfaces/User";

@Injectable({
    providedIn:'root'
})

export class UserService{
    private baseUrl = 'http://localhost:3000';

    constructor(private http:HttpClient){}

    createUser(user:User):Observable<User>{
        return this.http.post<User>(`${this.baseUrl}/users`,user);
    }
}