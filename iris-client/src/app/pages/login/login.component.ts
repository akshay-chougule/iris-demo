import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, USER_LOGIN, Credentials } from '../../store';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public login: FormControl;
  public password: FormControl;
  @select('auth') auth$: Observable<Credentials>;

  @HostBinding('class') componentCssClass = 'row h-100 justify-content-center align-items-center';

  constructor(private auth: AuthService, private store: NgRedux<IAppState>, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.login = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.loginForm = new FormGroup({
      login: this.login,
      password: this.password,
      grant_type: new FormControl('password')
    });
  }

  ngOnInit() {
    this.auth$.subscribe(auth => {
      if (auth && auth.accessToken) {
        this.router.navigate(['/home']);
      }
    });
  }

  signIn(e) {
    e.preventDefault();
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth
        .signIn(this.loginForm.value)
        .subscribe(response => {
          this.store.dispatch({ type: USER_LOGIN, payload: response['credentials'] });
        });
    } else {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
