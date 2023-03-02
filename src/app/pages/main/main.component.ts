import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    selectedCities: CityData[] = [];
    username: string | null = '';

    constructor(private cookieService: CookieService, private loginService: LoginService) { }

    ngOnInit(): void {
        this.username = this.loginService.getActiveUsername();
        if (this.username !== null) {
            const storedList = this.cookieService.get(this.username);
            if (storedList !== '') {
                this.selectedCities = JSON.parse(storedList);
            }
        }
    }

    addCity(city: CityData): void {
        const repeatedCities = this.selectedCities.filter((value) => value.id === city.id);
        if (repeatedCities.length === 0) {
            this.selectedCities.push(city);
            const username = this.loginService.getActiveUsername();
            if (username !== null) {
                this.cookieService.set(username, JSON.stringify(this.selectedCities));
            }
        }
    }

    logout(): void {
        this.loginService.logout();
    }

}
