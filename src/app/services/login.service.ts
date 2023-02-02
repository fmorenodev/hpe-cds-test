import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    users: User[] = [{ username: 'fmoreno', password: '123456' }, { username: 'user2', password: 'randompass' }];
    private isUserLoggedIn: boolean = false;

    login(user: User): boolean {
        if (this.users.some(elem => elem.username == user.username && elem.password == user.password)) {
            this.isUserLoggedIn = true;
            return true;
        }
        return false;
    }

    isLoggedIn(): boolean {
        return this.isUserLoggedIn;
    }
}
