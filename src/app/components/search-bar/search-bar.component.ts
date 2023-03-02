import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subject, OperatorFunction, Observable, debounceTime, distinctUntilChanged, filter, merge, map } from 'rxjs';
import cityDataJson from './cities.json';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

    @Output() selectedCities = new EventEmitter<CityData>();

    cityData: CityData[] = cityDataJson;

    @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    formatter = (result: CityData) => result.name;

    /**
     * Funcion auxiliar de la barra de búsqueda
     */
    search: OperatorFunction<string, readonly CityData[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map((term) =>
                (term === '' ? this.cityData : this.cityData.filter(
                    (city: CityData) => city.name.toLowerCase().indexOf(term.toLowerCase())
                        > -1)).slice(0, 10),
            ),
        );
    };

    addToCityList(event: NgbTypeaheadSelectItemEvent, input: HTMLInputElement): void {
        this.selectedCities.emit(event.item);
        event.preventDefault();
        input.value = '';
    }

}
