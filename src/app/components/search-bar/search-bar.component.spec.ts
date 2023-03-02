import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchBarComponent } from './search-bar.component';
import cityDataJson from './cities.json';

/**
 * En referencia a estos tests, he comprobado que el componente typeahead tiene un suite
 * propio de tests unitarios, y que comprobar la funcionalidad de la barra de búsqueda
 * con el componente de city-list entraría más en tests funcionales que en unitarios
 */

describe('SearchBarComponent', () => {
    let component: SearchBarComponent;
    let fixture: ComponentFixture<SearchBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgbTypeaheadModule],
            declarations: [SearchBarComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SearchBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load data correctly', () => {
        expect(component.cityData).toEqual(cityDataJson);
    });
});
