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

    constructor(private cookieService: CookieService, private loginService: LoginService) { }

    ngOnInit(): void {
        const storedList = this.cookieService.get(this.loginService.getActiveUsername())
        if (storedList !== '') {
            this.selectedCities = JSON.parse(storedList);
        }
    }

    addCity(city: CityData): void {
        const repeatedCities = this.selectedCities.filter((value) => value.id === city.id);
        console.log(repeatedCities);
        console.log(city)
        console.log(this.selectedCities)
        if (repeatedCities.length === 0) {
            this.selectedCities.push(city);
            this.cookieService.set(this.loginService.getActiveUsername(), JSON.stringify(this.selectedCities));
        }
    }

}
