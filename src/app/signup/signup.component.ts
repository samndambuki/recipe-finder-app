import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../interfaces/User';
import { UserService } from '../services/user.service';

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

  constructor(private http: HttpClient,private userService:UserService) {}

  signUpUser(): void {
    const newUser:User = {
      id:0,
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.userService.createUser(newUser).subscribe((response) => {
      console.log('User signed up successfully', response);

      localStorage.setItem('credentials', JSON.stringify(newUser));
    });
  }
}
