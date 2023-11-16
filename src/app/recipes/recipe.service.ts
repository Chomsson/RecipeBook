import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {MeasureTypes} from "../shared/enums";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
   recipeSelected = new EventEmitter<Recipe>;


   private recipes: Recipe[] = [
      new Recipe('kebab box',
         'bez surówek hehe mordo',
         'assets/kebab-box.jpg',
         [
            new Ingredient('Mięso', 500, MeasureTypes.g),
            new Ingredient('Frytki', 200, MeasureTypes.g)
         ]
         ),
      new Recipe('burger',
         'fat burger',
         'assets/burger.avif',
         [
            new Ingredient('Bułka', 1, MeasureTypes.pieces),
            new Ingredient('Mięso', 300, MeasureTypes.g),
            new Ingredient('Ser', 2, MeasureTypes.slices)
         ]),
   ];
   constructor() { }

   getRecipes() {
     return this.recipes.slice();
   }
}
