import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-city-detail',
    templateUrl: './city-detail.component.html',
    styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {

    weatherData: WeatherData | undefined;

    apiKey = '5b4a5fb7fff1a8f5a3c0cd68dc4e9a5b';
    apiUrl = `data/2.5/weather?appid=${this.apiKey}&id=`;

    iconSrc: string = '';

    constructor(private http: HttpClient, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: any) => {
            this.getWeatherData(params.id).subscribe({
                next: (data: WeatherData) => {
                    this.weatherData = data;
                    this.iconSrc = `http://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`;
                    console.log(data);
                },
                error: (e) => {
                    console.log(e);
                }
            });
        });
    }

    /**
     * Consigue los datos del tiempo de la API
     * @param cityId 
     */
    getWeatherData(cityId: number): Observable<any> {
        return this.http.get(this.apiUrl + cityId + '&units=metric&lang=es');
    }

}
