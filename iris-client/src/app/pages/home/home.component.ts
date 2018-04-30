import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, LIST_USERS, IUser } from '../../store';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @select('users') users$: Observable<IUser[]>;
  constructor(
    private store: NgRedux<IAppState>,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService
      .getUsers()
      .subscribe(users =>
        this.store.dispatch({ type: LIST_USERS, payload: users })
      );
  }
}
