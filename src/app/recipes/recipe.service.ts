import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {MeasureTypes} from "../shared/enums";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
   recipeSelected = new EventEmitter<Recipe>;


   private recipes: Recipe[] = [
      new Recipe('Kebab box XXL',
         'bez surówek hehe mordo',
         'assets/kebab-box.jpg',
         [
            new Ingredient('Chicken meat', 500, MeasureTypes.g),
            new Ingredient('Fries', 200, MeasureTypes.g)
         ]
         ),
      new Recipe('burger',
         'fat burger',
         'assets/burger.avif',
         [
            new Ingredient('Bun', 1, MeasureTypes.pieces),
            new Ingredient('Meat', 300, MeasureTypes.g),
            new Ingredient('Cheese', 2, MeasureTypes.slices)
         ]),
   ];
   constructor(private shoppingListService: ShoppingListService) { }

   getRecipes() {
     return this.recipes.slice();
   }

   getRecipe(index: number){
      return this.recipes[index];
   }

   addIngredientsToShoppingListServ(ingredients: Ingredient[]){
      this.shoppingListService.addIngredientsFromRecipe(ingredients);
   }
}
