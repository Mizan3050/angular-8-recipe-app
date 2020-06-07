import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as App from '../store/appReducer';
import {LogoutAction} from './store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {

  private tokenExpirationTimer: any;

  constructor(private store: Store<App.AppState>) {
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new LogoutAction());
    }, expirationDuration);
  }
}
