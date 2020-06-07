import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as App from './store/appReducer';
import {AutoLoginAction} from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<App.AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new AutoLoginAction());
  }
}
