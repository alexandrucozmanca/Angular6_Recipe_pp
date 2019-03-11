import {Injectable, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Recipe} from '../recipes/recipe.model';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DatabaseService {
  constructor(private http: Http, private authService: AuthService) {}
  DATABASE_ADDRESS = 'https://angular6-tutorial-b62e0.firebaseio.com/';
  tkn: string;

  getToken() {
    this.tkn = this.authService.getToken();
  }

  saveRecipes(recipes: Recipe[]) {
    this.getToken();
    return this.http.put(`${this.DATABASE_ADDRESS}/recipes.json?auth=${this.tkn}`, recipes);
  }

  getRecipes() {
    this.getToken();
    return this.http.get(`${this.DATABASE_ADDRESS}/recipes.json?auth=${this.tkn}`)
      .pipe(map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }))
      .pipe(catchError(
        err => {
          return throwError('Unable to retrieve recipes');
        }));
  }
}

