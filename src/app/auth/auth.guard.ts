import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as App from '../store/appReducer';
import {Store} from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<App.AppState>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        } else {
          return this.router.createUrlTree(['/auth']);
        }
      }));
  }

}
