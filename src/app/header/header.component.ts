import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as App from '../store/appReducer';
import {map} from 'rxjs/operators';
import {LogoutAction} from '../auth/store/auth.actions';
import {CreateRecipeAction, RetrieveRecipesAction} from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;

  collapsed = true;
  isAuthenticated = false;

  constructor(private store: Store<App.AppState>) {
  }

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
          this.isAuthenticated = !!user;
        }
      );
  }


  saveRecipes() {
    this.store.dispatch(new CreateRecipeAction());
  }

  fetchRecipes() {
    this.store.dispatch(new RetrieveRecipesAction());
  }

  onLogout() {
    this.store.dispatch(new LogoutAction());
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
