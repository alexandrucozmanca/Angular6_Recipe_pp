import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.initForm();
      });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients,
      this.id !== null ? this.id : null
    );

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  addIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
    }));
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;

      if (recipe.ingredients) {
      for (const ingredient of recipe.ingredients) {
        recipeIngredients.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
              ]
            )
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      ingredients:  recipeIngredients
    });
  }


}
