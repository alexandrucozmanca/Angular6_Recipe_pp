import {Component} from '@angular/core';
import {DatabaseService} from '../../shared/database.service';
import {RecipeService} from '../../recipes/recipe.service';
import {Recipe} from '../../recipes/recipe.model';
import {AuthService} from '../../auth/auth.service';

@Component({
  templateUrl: './header.component.html',
  selector: 'app-header'
})
export class HeaderComponent {

  constructor(
    private databaseService: DatabaseService,
    private recipeService: RecipeService,
    public authService: AuthService) {}

  onSaveData() {
    this.databaseService.saveRecipes(this.recipeService.getRecipes()).subscribe(
      response => console.log(response)
    );
  }

  onFetchData() {
    this.databaseService.getRecipes().subscribe(
      (recipes: Recipe[]) => this.recipeService.setRecipes(recipes)
    );
  }

  onLogout() {
    this.authService.logout();
  }
}

