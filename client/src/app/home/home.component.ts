import { Component } from '@angular/core'
import { AuthenticationService, LoginData } from '../authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  credentials: LoginData = {
    username: '',
    password: ''
  }

  loginError = false
  errorMessage = ''

  constructor(private auth: AuthenticationService, private router: Router) { }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/merleg');
    }, (err) => {
      this.loginError = true;
      this.errorMessage = err.error.message;
    });
  }

  closeError() {
    this.errorMessage = '';
    this.loginError = false;
  }
}
