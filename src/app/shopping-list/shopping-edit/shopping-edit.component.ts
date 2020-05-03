import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {amountValidator} from './amount-validator';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  shoppingListForm: FormGroup;
  subscription: Subscription;
  editMode = false;
  editedIndex: number;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.shoppingListForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, amountValidator])
    });

    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editedIndex = index;
      this.editMode = true;
      const ingredient = this.shoppingListService.getIngredient(index);
      this.shoppingListForm.setValue({
        name: ingredient.name,
        amount: ingredient.amount
      });
    });
  }

  onAddOrUpdateItem() {
    const ingName = this.shoppingListForm.get('name').value;
    const ingAmount = this.shoppingListForm.get('amount').value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onClearForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClearForm() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedIndex);
    this.onClearForm();
  }
}
