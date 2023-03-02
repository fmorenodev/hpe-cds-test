import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    users: User[] = [{ username: 'fmoreno', password: 'randompass' }, { username: 'user2', password: 'randompass' }];

    constructor(private router: Router) { }

    login(user: User): boolean {
        if (this.users.some(elem => elem.username == user.username && elem.password == user.password)) {
            sessionStorage.setItem('loggedUser', user.username);
            return true;
        }
        return false;
    }

    logout(): void {
        if (this.isLoggedIn()) {
            sessionStorage.clear();
            this.router.navigate(['/login']);
        }
    }

    isLoggedIn(): boolean {
        return sessionStorage.getItem('loggedUser') !== null;
    }

    getActiveUsername(): string | null {
        return sessionStorage.getItem('loggedUser');
    }
}
