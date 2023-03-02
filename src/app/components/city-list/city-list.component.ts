import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-city-list',
    templateUrl: './city-list.component.html',
    styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnChanges {

    @Input() selectedCities: CityData[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        this.selectedCities = changes['selectedCities'].currentValue;
    }

    deleteCity(cityIndex: number) {
        this.selectedCities.splice(cityIndex, 1)
    }

}
