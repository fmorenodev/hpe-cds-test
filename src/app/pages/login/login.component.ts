import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    form: User = {
        username: '',
        password: ''
    };
    isLoginFailed = false;

    constructor(private loginService: LoginService, private router: Router) { }

    onSubmit(): void {
        if (this.loginService.login(this.form)) {
            this.isLoginFailed = false;
            this.router.navigate(['/main']);
        } else {
            this.isLoginFailed = true;
        }
    }
}