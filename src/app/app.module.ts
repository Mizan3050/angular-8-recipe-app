import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {SharedModule} from './shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {shoppingListReducer} from './shopping-list/store/shopping-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
