import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityDetailComponent } from './pages/city-detail/city-detail.component';
import { LoginGuard } from './helpers/login.guard';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'main', component: MainComponent, canActivate: [LoginGuard] },
    { path: 'city/:name', component: CityDetailComponent, canActivate: [LoginGuard] },
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: "**", component: MainComponent, canActivate: [LoginGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
