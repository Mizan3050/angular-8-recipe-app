import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {amountValidator} from '../../shopping-list/shopping-edit/amount-validator';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean;
  recipeForm: UntypedFormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
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
    const recipeIngredients = new UntypedFormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImageUrl = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(new UntypedFormGroup({
            name: new UntypedFormControl(ingredient.name, Validators.required),
            amount: new UntypedFormControl(ingredient.amount, [Validators.required, amountValidator])
          }));
        }
      }
    }

    this.recipeForm = new UntypedFormGroup({
      name: new UntypedFormControl(recipeName, Validators.required),
      imagePath: new UntypedFormControl(recipeImageUrl, Validators.required),
      description: new UntypedFormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });

  }

  onSubmit() {
    const recipe = this.recipeForm.value;
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.onCancel();
  }

  getIngredientControls() {
    return (this.recipeForm.get('ingredients') as UntypedFormArray).controls;
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as UntypedFormArray).push(new UntypedFormGroup({
      name: new UntypedFormControl(null, Validators.required),
      amount: new UntypedFormControl(null, [Validators.required, amountValidator])
    }));
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as UntypedFormArray).removeAt(index);
  }
}
