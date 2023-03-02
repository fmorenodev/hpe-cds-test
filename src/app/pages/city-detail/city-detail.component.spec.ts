import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { testRoutes } from 'src/app/app-routing.module';

import { CityDetailComponent } from './city-detail.component';

describe('CityDetailComponent', () => {
    let component: CityDetailComponent;
    let fixture: ComponentFixture<CityDetailComponent>;

    let httpTestingController: HttpTestingController;
    let apiUrl = `data/2.5/weather?appid=5b4a5fb7fff1a8f5a3c0cd68dc4e9a5b&id=`;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(testRoutes)],
            declarations: [CityDetailComponent]
        })
            .compileComponents();

        httpTestingController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(CityDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get data from API', () => {
        const expectedData: WeatherData = {
            "coord": {
                "lon": -6.3333,
                "lat": 37.8333
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "cielo claro",
                    "icon": "01d"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 15.59,
                "feels_like": 14.09,
                "temp_min": 15.59,
                "temp_max": 15.59,
                "pressure": 1019,
                "humidity": 34,
                "sea_level": 1019,
                "grnd_level": 976
            },
            "visibility": 10000,
            "wind": {
                "speed": 1.51,
                "deg": 21,
                "gust": 1.96
            },
            "clouds": {
                "all": 8
            },
            "dt": 1677775934,
            "sys": {
                "type": 2,
                "id": 2013008,
                "country": "ES",
                "sunrise": 1677740182,
                "sunset": 1677781146
            },
            "timezone": 3600,
            "id": 2509304,
            "name": "Zufre",
            "cod": 200
        };
        const id = 2509304;
        component.getWeatherData(id).subscribe(data => {
            expect(data).toEqual(expectedData);
        });
        const req = httpTestingController.expectOne({
            method: "GET",
            url: apiUrl + id + '&units=metric&lang=es'
        });

        req.flush(expectedData);
    });
});
