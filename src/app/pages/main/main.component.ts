import { Component } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent {

    selectedCities: CityData[] = [];

    addCity(city: CityData): void {
        this.selectedCities.push(city);
    }

}
