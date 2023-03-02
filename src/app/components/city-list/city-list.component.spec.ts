import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { routes, testRoutes } from 'src/app/app-routing.module';

import { CityListComponent } from './city-list.component';
import { Router } from '@angular/router';

describe('CityListComponent', () => {
    let component: CityListComponent;
    let fixture: ComponentFixture<CityListComponent>;
    let location: Location;
    let router: Router;

    const cities: CityData[] = [{
        "id": 2509300,
        "name": "Zújar",
        "state": "",
        "country": "ES",
        "coord": {
            "lon": -2.84197,
            "lat": 37.54285
        }
    },
    {
        "id": 2509302,
        "name": "Zuheros",
        "state": "",
        "country": "ES",
        "coord": {
            "lon": -4.31531,
            "lat": 37.54332
        }
    }];
    const citiesAfterDeletion = [{
        "id": 2509302,
        "name": "Zuheros",
        "state": "",
        "country": "ES",
        "coord": {
            "lon": -4.31531,
            "lat": 37.54332
        }
    }];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(testRoutes)],
            declarations: [CityListComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CityListComponent);
        component = fixture.componentInstance;
        component.selectedCities = cities;
        fixture.detectChanges();

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        router.initialNavigation();
        router.navigate(['/main']);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should delete element correctly', () => {
        const button = fixture.debugElement.query(By.css(".btn"));
        button.nativeElement.click();
        expect(component.selectedCities).toEqual(citiesAfterDeletion);
    });

    it('should open city-detail when clicking on a list element', fakeAsync(() => {
        const city = fixture.debugElement.query(By.css(".city-name"));
        city.nativeElement.click();
        tick();
        expect(location.path()).toContain('/city?id=');
    }));
});
