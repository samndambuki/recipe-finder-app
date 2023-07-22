//miport the component decorator from angular core
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IngredientService } from '../services/ingredient.service';
import { Ingredient } from '../interfaces/ingredient.interface';
import { FormsModule } from '@angular/forms';

//use the component decorator to define our component
@Component({
  //define a custom html tag for our component
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  ingridientName: string = '';
  quantity: string = '';
  unit: string = '';
  expirationDate: string = '';
  category: string = 'fruits';
  //no initial notes for the ingredient
  notes: string = '';

  //we have used dependecy injection
  //allows us to access methods and properties of Ingridient service inside our component
  constructor(private ingredientService: IngredientService) {}

  //void - a function with no return value
  addIngredient(): void {
    const newIngredient: Ingredient = {
      name: this.ingridientName,
      quantity: this.quantity,
      unit: this.unit,
      expirationDate: this.expirationDate,
      category: this.category,
      notes: this.notes,
    };

    //method returns a observable
    //representing the asynchronous operation of adding the ingredient
    //when the response arrives, the code inside the arrow function will be executed
    this.ingredientService.addIngredient(newIngredient).subscribe(
      (response) => {
        console.log('Ingredient added successfully', response);
        this.cancelForm();
      },
      (error) => {
        console.log('Error adding ingredient', error);
      }
    );
  }

  toggleForm(): void {
    console.log('toggle form clicked');

    this.showForm = !this.showForm;
  }

  cancelForm(): void {
    //clears value of the ingridientName in the form
    this.ingridientName = '';
    this.quantity = '';
    this.unit = '';
    this.expirationDate = '';
    this.category = 'fruits';
    this.notes = '';
    this.showForm = false;
  }
}
