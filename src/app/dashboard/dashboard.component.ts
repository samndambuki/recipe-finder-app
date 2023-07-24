//miport the component decorator from angular core
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../interfaces/recipe.interface';
import { FormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

//use the component decorator to define our component
@Component({
  //define a custom html tag for our component
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,TimepickerModule],
  //define the html tag that contains the template for this component
  templateUrl: './dashboard.component.html',
  //define css styles that contain the styles for this component
  styleUrls: ['./dashboard.component.css'],
})

//typescript class that represents our component
export class DashboardComponent {
  //define properties for our component and initialize them with default values
  //form to enter ingredients is initially hidden
  showForm: boolean = false;
  //there is no initial value for the ingridientName
  name: string = '';
  description: string = '';
  ingredients: [] = [];
  cookingInstructions: string = '';
  preparationTime:string = ''
  servings:string = ''
  imageUrl:string = ''
  //no initial notes for the ingredient
  notes: string = '';

  //we have used dependecy injection
  //allows us to access methods and properties of Ingridient service inside our component
  constructor(private recipeService: RecipeService,private localeService:BsLocaleService) {
    this.localeService.use('default')

  }

  //void - a function with no return value
  addRecipe(): void {
    const newRecipe: Recipe = {
      name: this.name,
      description: this.description,
      ingredients: this.ingredients,
      cookingInstructions: this.cookingInstructions,
      preparationTime: this.preparationTime,
      servings: this.servings,
      imageUrl: this.imageUrl,
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
    this.imageUrl = '';
    this.showForm = false;
    
  }
}
