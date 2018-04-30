import { async, ComponentFixture, TestBed, fakeAsync, getTestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { NgRedux, select, NgReduxModule } from '@angular-redux/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, Router } from '@angular/router';
import {HomeComponent} from './../home/home.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }
];
class MockRouter {
  navigate(url: string) { return url; }
}
// test module configuration for each test
const testModuleConfig = () => {
  // reset the test environment before initializing it.
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, NgReduxModule, RouterTestingModule.withRoutes(routes)],
      declarations: [LoginComponent, HomeComponent],
      providers: [AuthService]
    });
};
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    testModuleConfig();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call createForm method', () => {
    const createForm = spyOn(component, 'createForm');
    const navigateToHome = spyOn(component, 'checkLoginAndNavigate');
    component.ngOnInit();
    expect(createForm).toHaveBeenCalled();
    expect(navigateToHome).toHaveBeenCalled();
  });
  it('should create login form object', () => {
    component.ngOnInit();
    expect(component.login).toBeDefined();
    expect(component.password).toBeDefined();
    expect(component.loginForm).toBeDefined();
  });
  it('should validate login when form is submitted', () => {
    component.ngOnInit();
  });
  it('should redirect to home page if already logged in', fakeAsync(() => {
    const injector = getTestBed();
    const router = injector.get(Router);
    component.checkLoginAndNavigate().then(() => {
      expect(router.url).toEqual('/');
      });
  }));
});
