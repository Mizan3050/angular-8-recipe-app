import {NgModule} from '@angular/core';
import {AlertComponent} from './alert/alert.component';
import {DropdownDirective} from './dropdown-directive/dropdown.directive';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [AlertComponent, DropdownDirective, LoadingSpinnerComponent],
  imports: [CommonModule],
  exports: [AlertComponent, DropdownDirective, LoadingSpinnerComponent, CommonModule]
})
export class SharedModule {

}
