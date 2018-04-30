import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, USER_LOGIN, Credentials } from '../../store';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public login: FormControl;
  public password: FormControl;
  @select('auth') auth$: Observable<Credentials>;
  constructor(private auth: AuthService, private store: NgRedux<IAppState>, private router: Router) {

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
    this.createForm();
    this.checkLoginAndNavigate();
  }

  checkLoginAndNavigate() {
    const promise = new Promise((resolve, reject) => {
      this.auth$.subscribe(auth => {
        if (auth && auth.accessToken) {
          this.router.navigate(['/home']);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
    return promise;
  }
  signIn(e) {
    e.preventDefault();
    console.log(this.loginForm.value);
    this.auth
      .signIn(this.loginForm.value)
      .subscribe(response => {
        this.store.dispatch({ type: USER_LOGIN, payload: response['credentials'] });
      });
  }
}
