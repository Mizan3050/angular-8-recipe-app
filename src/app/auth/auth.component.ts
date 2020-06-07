import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {Store} from '@ngrx/store';
import * as App from '../store/appReducer';
import {ClearErrorAction, LoginStartAction, SignUpStartAction} from './store/auth.actions';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private storeSubscription: Subscription;

  constructor(private authService: AuthService,
              private store: Store<App.AppState>) {
  }

  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(new LoginStartAction({email, password}));
    } else {
      this.store.dispatch(new SignUpStartAction({email, password}));
    }

    authForm.reset();
  }

  onHandleError() {
    this.store.dispatch(new ClearErrorAction());
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
