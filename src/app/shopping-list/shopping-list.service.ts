import {EventEmitter, Injectable, ViewChild} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {MeasureTypes} from "../shared/enums";
import {Subject} from "rxjs";
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

   ingredientsChanged= new Subject<Ingredient[]>();
   editingStarted = new Subject<number>();
   private ingredients: Ingredient[] = [
      new Ingredient("Onion", 2, MeasureTypes.kg),
      new Ingredient("Tomato", 3, MeasureTypes.kg)
   ];
  constructor() { }

   getIngredients(){
     return this.ingredients.slice();
   }

   getIngredient(index: number){
      return this.ingredients[index];
   }

   addIngredient(ingredient: Ingredient){
     this.ingredients.push(ingredient);
     this.ingredientsChanged.next(this.ingredients.slice());
   }

   addIngredientsFromRecipe(ingredients: Ingredient[]){
     this.ingredients.push(...ingredients);
     this.ingredientsChanged.next(this.ingredients.slice());
   }

   updateIngredient(index: number, updatedIngredient: Ingredient){
      this.ingredients[index] = updatedIngredient;
      this.ingredientsChanged.next(this.ingredients.slice());
   }

   onDeleteIngredientFromList(index: number){
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
   }
}
