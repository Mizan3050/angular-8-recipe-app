import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {amountValidator} from '../../shopping-list/shopping-edit/amount-validator';
import * as App from '../../store/appReducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {AddRecipeAction, UpdateRecipeAction} from '../store/recipe.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode: boolean;
  recipeForm: FormGroup;

  private storeSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private store: Store<App.AppState>) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = !isNaN(this.id);
      this.initForm();
    });
  }

  private initForm() {

    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.storeSub = this.store.select('recipes')
        .pipe(
          map(recipeState => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe(recipe => {
          recipeName = recipe.name;
          recipeImageUrl = recipe.imagePath;
          recipeDescription = recipe.description;

          if (recipe.ingredients) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [Validators.required, amountValidator])
              }));
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImageUrl, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });

  }

  onSubmit() {
    const recipe = this.recipeForm.value;
    if (this.editMode) {
      this.store.dispatch(new UpdateRecipeAction({recipe, index: this.id}));
    } else {
      this.store.dispatch(new AddRecipeAction(recipe));
    }
    this.onCancel();
  }

  getIngredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, amountValidator])
    }));
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
