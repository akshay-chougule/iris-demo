import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, LIST_INFACT_RECORDS, IRecord } from '../../store';
import { Observable } from 'rxjs/Observable';
import { InfactService } from '../../services/infact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @select('records') infactRecords: IRecord[];
  constructor(
    private store: NgRedux<IAppState>,
    private infactService: InfactService
  ) {}

  ngOnInit() {
    this.infactService
      .getInfactRecord()
      .subscribe(records =>
        this.store.dispatch({ type: LIST_INFACT_RECORDS, payload: records })
      );
  }
}
