import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { Credentials } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showNav: boolean;
  @select('auth') auth$: Observable<Credentials>;

  constructor() {
    this.showNav = false;
  }

  ngOnInit() {
    this.auth$.subscribe(auth => {
      if (auth && auth.accessToken) {
        this.showNav = true;
      }
    });
  }
}
