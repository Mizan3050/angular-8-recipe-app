import {NgModule} from '@angular/core';
import {ShoppingListComponent} from './shopping-list.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: ShoppingListComponent}])],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {

}
