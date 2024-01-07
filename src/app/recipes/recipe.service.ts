import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {MeasureTypes} from "../shared/enums";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

   recipesChangedSubject: Subject<Recipe[]> = new Subject<Recipe[]>();
   editMode:boolean = false;

   private recipes: Recipe[] = [];
   //    [
   //    new Recipe('Kebab box XXL',
   //       'bez surówek hehe mordo',
   //       'assets/kebab-box.jpg',
   //       [
   //          new Ingredient('Chicken meat', 500, MeasureTypes.g),
   //          new Ingredient('Fries', 200, MeasureTypes.g)
   //       ]
   //       ),
   //    new Recipe('burger',
   //       'fat burger',
   //       'assets/burger.avif',
   //       [
   //          new Ingredient('Bun', 1, MeasureTypes.pieces),
   //          new Ingredient('Meat', 300, MeasureTypes.g),
   //          new Ingredient('Cheese', 2, MeasureTypes.slices)
   //       ]),
   // ];
   constructor(private shoppingListService: ShoppingListService) { }

   setRecipes(recipesInMethod: Recipe[]){
      this.recipes = recipesInMethod;
      this.recipesChangedSubject.next(this.recipes.slice());
   }

   getRecipes() {
     return this.recipes.slice();
   }

   getRecipe(index: number){
      return this.recipes[index];
   }

   addRecipeFromEditPage(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipesChangedSubject.next(this.recipes.slice());
   }

   updateRecipeFromEditPage(index: number, updatedRecipe: Recipe){
      this.recipes[index] = updatedRecipe;
      this.recipesChangedSubject.next(this.recipes.slice());
   }

   addIngredientsToShoppingListServ(ingredients: Ingredient[]){
      this.shoppingListService.addIngredientsFromRecipe(ingredients);
   }

   deleteRecipe(index: number){
      this.recipes.splice(index, 1);
      this.recipesChangedSubject.next(this.recipes.slice());

   }
}
