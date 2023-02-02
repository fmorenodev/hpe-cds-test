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

    city: CityData | undefined;

    apiKey = '5b4a5fb7fff1a8f5a3c0cd68dc4e9a5b';
    apiUrl = `data/2.5/weather?appid=${this.apiKey}&id=`;

    constructor(private http: HttpClient, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: any) => {
            this.getCityData(params.id).subscribe({
                next: (data) => {
                    console.log(data);
                    this.city = data;
                },
                error: (e) => {
                    console.log(e);
                }
            });
        });
    }

    getCityData(cityId: number): Observable<any> {
        return this.http.get(this.apiUrl + cityId);
    }

}
