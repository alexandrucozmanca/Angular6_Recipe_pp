import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
   private recipes: Recipe[] = [
    // new Recipe('Tasty Snitzel', 'A dead bird',
    //   'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Zigeunerschnitzel_Jennrkaser.JPG/120px-Zigeunerschnitzel_Jennrkaser.JPG',
    //   [
    //     new Ingredient('Meat', 1),
    //     new Ingredient('French Fries', 20)
    //   ], 0),
    // new Recipe('Burger', 'A dead cow',
    //   'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/2018-04-26_Pulled_beef_burger.jpg/800px-2018-04-26_Pulled_beef_burger.jpg',
    //   [
    //     new Ingredient('Meat', 1),
    //     new Ingredient('Buns', 2)
    //   ], 1)
    ];

   recipesChanged = new Subject<Recipe[]>();

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes);
  }

  getRecipeById(id: number) {
    const foundRecipe = this.recipes.find(
      (recipe) => {
        return recipe.id === id;
      }
    );

    return foundRecipe;
  }

  addRecipe(recipe: Recipe) {
    recipe.id = this.recipes.length;
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

