import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
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
    this.isLoading = true;
    let authResponseDataObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authResponseDataObservable = this.authService.login(email, password);
    } else {
      authResponseDataObservable = this.authService.signUp(email, password);
    }

    authResponseDataObservable.subscribe(() => {
      this.isLoading = false;
      this.router.navigate(['/recipes']);
      this.error = null;
    }, errorRes => {
      this.error = errorRes;
      this.isLoading = false;
    });

    authForm.reset();
  }
}
