import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CityDetailComponent } from './pages/city-detail/city-detail.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent,
        SearchBarComponent,
        CityDetailComponent,
        CityListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule { }
