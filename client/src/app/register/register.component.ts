import { Component } from '@angular/core';
import { AuthService, User } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
    credentials: User = {
        email: '',
        username: '',
        fullname: '',
        password: '',
    };

    regError = false;
    errorMessage = '';

    constructor(private auth: AuthService, private router: Router) {}

    register() {
        this.auth.register(this.credentials).subscribe(
            () => {
                this.router.navigateByUrl('/merleg');
            },
            (err) => {
                this.errorMessage = err.error.message;
                this.regError = true;
            }
        );
    }

    closeError() {
        this.errorMessage = '';
        this.regError = false;
    }
}
