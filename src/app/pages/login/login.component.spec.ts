import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { routes } from 'src/app/app-routing.module';
import { LoginService } from 'src/app/services/login.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let location: Location;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule.withRoutes(routes)],
            declarations: [LoginComponent],
            teardown: {destroyAfterEach: false}
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        sessionStorage.clear();
        fixture.debugElement.injector.get(CookieService).deleteAll();

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        router.initialNavigation();
        router.navigate(['/login']);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form should be invalid if empty', () => {
        expect(component.form.valid).toBeFalsy();
    });

    it('form should be valid if full', () => {
        component.form.controls['username'].setValue('dfgdfgdf');
        component.form.controls['password'].setValue('dfgdfgd');
        expect(component.form.valid).toBeTruthy();
    });

    it('should login correctly', () => {
        const loginService = fixture.debugElement.injector.get(LoginService);

        expect(component.form.valid).toBeFalsy();
        component.form.controls['username'].setValue('fmoreno');
        component.form.controls['password'].setValue('randompass');
        expect(component.form.valid).toBeTruthy();

        component.onSubmit();

        expect(component.isLoginFailed).toBeFalsy();
        expect(loginService.isLoggedIn()).toBeTruthy();
        expect(loginService.getActiveUsername()).toBe('fmoreno');
    });

    it('should login and navigate to main page', fakeAsync(() => {
        const loginService = fixture.debugElement.injector.get(LoginService);

        expect(component.form.valid).toBeFalsy();
        component.form.controls['username'].setValue('fmoreno');
        component.form.controls['password'].setValue('randompass');
        expect(component.form.valid).toBeTruthy();

        component.onSubmit();
        tick();

        expect(location.path()).toBe('/main');
    }));

    it('should not login when data is incorrect', fakeAsync(() => {
        const loginService = fixture.debugElement.injector.get(LoginService);

        expect(component.form.valid).toBeFalsy();
        component.form.controls['username'].setValue('assdkfnkg');
        component.form.controls['password'].setValue('fgdkfgn');
        expect(component.form.valid).toBeTruthy();

        component.onSubmit();
        tick();

        expect(component.isLoginFailed).toBeTruthy();
        expect(loginService.isLoggedIn()).toBeFalsy();
        expect(loginService.getActiveUsername()).toBe(null);
        expect(location.path()).toBe('/login');
    }));
});
