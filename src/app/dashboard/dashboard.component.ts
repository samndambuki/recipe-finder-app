//miport the component decorator from angular core
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../interfaces/recipe.interface';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';

//use the component decorator to define our component
@Component({
  //define a custom html tag for our component
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,SearchPipe],
  //define the html tag that contains the template for this component
  templateUrl: './dashboard.component.html',
  //define css styles that contain the styles for this component
  styleUrls: ['./dashboard.component.css'],
})

//typescript class that represents our component
export class DashboardComponent implements OnInit {
  //define properties for our component and initialize them with default values
  //form to enter ingredients is initially hidden
  showForm: boolean = false;
  //there is no initial value for the ingridientName
  name: string = '';
  description: string = '';
  ingredients: [] = [];
  cookingInstructions: string = '';
  preparationTime: string = '';
  servings: string = '';
  //no initial notes for the ingredient
  notes: string = '';
  recipes: Recipe[] = [];
  selectedRecipe: Recipe | undefined;
  searchQuery:string = ''

  currentPage:number = 1;
  itemsPerPage:number = 2;

  //edit user profile
  showUserProfile:boolean = false;

  editingUserProfile:boolean = false;




  //stores info of the current logged in user
  //null indicates there is no logged in user
  // = null is the initial value assigned to currentUser
  //by default when component is initialized there is no logged in user so value is set to null
  currentUser:User | null = null;


  //we have used dependecy injection
  //allows us to access methods and properties of Ingridient service inside our component
  constructor(private recipeService: RecipeService,private router:Router) {}

  logout():void{
    localStorage.removeItem('credentials')
    this.router.navigate(['/signin'])
  }

  ngOnInit(): void {
    this.loadRecipes();
    this.loadCurrentUser();
  }


  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe(
      (recipes) => {
        this.recipes = recipes;
      },
      (error) => {
        console.log('Error fetching recipes', error);
      }
    );
  }

  //void - a function with no return value
  addRecipe(): void {
    const newRecipe: Recipe = {
      id: 0,
      name: this.name,
      description: this.description,
      ingredients: this.ingredients,
      cookingInstructions: this.cookingInstructions,
      preparationTime: this.preparationTime,
      servings: this.servings,
    };

    //method returns a observable
    //representing the asynchronous operation of adding the ingredient
    //when the response arrives, the code inside the arrow function will be executed
    this.recipeService.addRecipe(newRecipe).subscribe(
      (response) => {
        console.log('Recipe added successfully', response);
        this.cancelForm();
      },
      (error) => {
        console.log('Error adding recipe', error);
      }
    );
  }

  toggleForm(): void {
    console.log('toggle form clicked');

    this.showForm = !this.showForm;
  }

  cancelForm(): void {
    //clears value of the ingridientName in the form
    this.name = '';
    this.description = '';
    this.ingredients = [];
    this.cookingInstructions = '';
    this.preparationTime = '';
    this.servings = '';
    this.showForm = false;
  }

  openRecipeDetails(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  closeRecipeDetails(): void {
    this.selectedRecipe = undefined;
  }

  //methods to edit user profile
  showUserProfileDialog():void{
    this.showUserProfile = true;
  }

  hideUserProfileDialog():void{
    this.showUserProfile = false;
  }



  //method declaration 
  //:void - indicates that the method does not return any value
  loadCurrentUser():void{
    //retrieves value associated with the key credentials from local storage 
    const userJson = localStorage.getItem('credentials')

    //checks if userJson variable is null or undefined
    //checks if there is user data stored in local storage
    if(userJson){
      //prepopulates the current user property
      //json.parse converts string to object
      this.currentUser = JSON.parse(userJson)
    }
  }

  editUserProfile():void{
    this.editingUserProfile = true;
  }

  cancelEditUserProfile():void{
    this.editingUserProfile = false
  }

  saveUserProfile(): void {
    // Save the updated user profile to local storage
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  
    // Close the edit form and refresh the view
    this.editingUserProfile = false;
  }
  


 

}


// const jsonString = '{"name":"Sam","age":22,"city":"Nyeri"}';
// const parsedObject  = JSON.parse(jsonString)

// console.log(parsedObject.name)
// console.log(parsedObject.age)
// console.log(parsedObject.city)