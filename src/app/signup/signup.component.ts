import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name!: string;
  email!: string;
  password!: string;

  constructor(private http: HttpClient,private dataService:DataService) {}

  signUpUser(): void {
    const newUser:User = {
      id:0,
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.dataService.createUser(newUser).subscribe((response) => {
      console.log('User signed up successfully', response);

      localStorage.setItem('credentials', JSON.stringify(newUser));
    });
  }
}
