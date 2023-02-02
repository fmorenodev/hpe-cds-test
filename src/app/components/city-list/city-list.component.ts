import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-city-list',
    templateUrl: './city-list.component.html',
    styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnChanges {

    @Input() selectedCities: CityData[] = [];

    constructor(private router: Router) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.selectedCities = changes['selectedCities'].currentValue;
    }

    deleteCity(cityIndex: number) {
        this.selectedCities.splice(cityIndex, 1)
    }

}
