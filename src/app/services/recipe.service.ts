//marks the service as injectable alloes it to be povided throughout the application
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  Recipe } from '../interfaces/recipe.interface';

//define the injectable service
//marks ingredient service as an injectable service making it available throughout the application
@Injectable({
  //metadata ensures that the service is provided at the root level
  providedIn: 'root',
})

export class RecipeService {
  //define the base url for API requests
  private baseUrl = 'http://localhost:3000/recipes';

  //private parameter http of type Http Client
  //alloews the service to use http to make http requests
  constructor(private http: HttpClient) {}

  //method to get ingredients
  //fetches a list of ingrdients from the api
  //why we use ingredient as an array :
  //1. multiple ingredients - multiple items as a response
  //2. data consistency - easier to iterate over a collection of objects when organized in an array
  //3. flexibility - allows us to add or remove items from the list easily. we can use array methods like filter, map, reduce
  //4. seamless integration - helps us use built in directives like *ngFor
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.baseUrl);
  }

  //sends a post request to add an ingredient
  //pass a parameter ingredient. expects an object that conforms to ingredient interface
  //returns an obeservable that emits an object of type ingredient
  addRecipe(recipe: Recipe): Observable<Recipe> {
    //post method sends data to server's url specified by this.baseUrl data to be sent is ingredient object
    //this.http - instance of the http service
    //ingredient - data sent to the server when creating a new ingredient
    //return  returns an observable - allows the caller of the method to handle response or errors returned by the server
    return this.http.post<Recipe>(this.baseUrl, recipe);
  }
}
