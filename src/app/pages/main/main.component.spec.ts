import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login.service';

import { MainComponent } from './main.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes, testRoutes } from 'src/app/app-routing.module';
import { CookieService } from 'ngx-cookie-service';

@Component({ selector: 'app-search-bar', template: '' })
class SearchBarStubComponent {
}

@Component({ selector: 'app-city-list', template: '' })
class CityListStubComponent {
}

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;
    let loginService: LoginService;
    let location: Location;
    let router: Router;
    const cities: CityData[] = [{
        "id": 2509304,
        "name": "Zufre",
        "state": "",
        "country": "ES",
        "coord": {
            "lon": -6.33333,
            "lat": 37.833328
        }
    },
    {
        "id": 2509305,
        "name": "Zubia",
        "state": "",
        "country": "ES",
        "coord": {
            "lon": -3.584,
            "lat": 37.119061
        }
    }];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(testRoutes)],
            declarations: [MainComponent, SearchBarStubComponent, CityListStubComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();

        const cookieService = TestBed.inject(CookieService);
        cookieService.deleteAll();
        cookieService.set('fmoreno', JSON.stringify(cities));

        loginService = TestBed.inject(LoginService);
        loginService.login({ username: 'fmoreno', password: 'randompass' });

        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        router.initialNavigation();
        router.navigate(['/main']);

        sessionStorage.clear();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display username', () => {
        const span = fixture.debugElement.query(By.css("#username"));
        expect(component.username).toBe('fmoreno');
        expect(span.nativeElement.innerHTML).toBe('Estás conectado como fmoreno');
    });

    it('should get cookies from a user that has them', () => {
        expect(component.selectedCities).toEqual(cities);
    });

    it('should logout correctly', fakeAsync(() => {
        component.logout();
        expect(loginService.isLoggedIn()).toBeFalsy();
        expect(loginService.getActiveUsername()).toBe(null);
    }));
});
