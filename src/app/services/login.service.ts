import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    users: User[] = [{ username: 'fmoreno', password: 'randompass' }, { username: 'user2', password: 'randompass' }];
    private activeUsername: string = '';
    private isUserLoggedIn: boolean = false;

    login(user: User): boolean {
        if (this.users.some(elem => elem.username == user.username && elem.password == user.password)) {
            this.isUserLoggedIn = true;
            this.activeUsername = user.username;
            return true;
        }
        return false;
    }

    isLoggedIn(): boolean {
        return this.isUserLoggedIn;
    }

    getActiveUsername(): string {
        return this.activeUsername;
    }
}
