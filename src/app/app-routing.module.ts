import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityDetailComponent } from './pages/city-detail/city-detail.component';
import { LoginGuard } from './helpers/login.guard';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'main', component: MainComponent, canActivate: [LoginGuard] },
    { path: 'city', component: CityDetailComponent, canActivate: [LoginGuard] },
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: "**", component: MainComponent, canActivate: [LoginGuard] }
];

export const testRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'main', component: MainComponent },
    { path: 'city', component: CityDetailComponent },
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: "**", component: MainComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
