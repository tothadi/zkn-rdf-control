import { Component } from '@angular/core';
import { AuthenticationService, User } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  credentials: User = {
    email: '',
    username: '',
    fullname: '',
    password: ''
  };

  regError = false;
  errorMessage = '';

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/merleg');
    }, (err) => {
      this.errorMessage = err.error.message;
      this.regError = true;
    });
  }

  closeError() {
    this.errorMessage = '';
    this.regError = false;
  }
}
