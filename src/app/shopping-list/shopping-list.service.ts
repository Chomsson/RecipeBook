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
   private ingredients: Ingredient[] = [
      new Ingredient("Onion", 2, MeasureTypes.kg),
      new Ingredient("Tomato", 3, MeasureTypes.kg)
   ];
  constructor() { }

   getIngredients(){
     return this.ingredients.slice();
   }

   addIngredient(ingredient: Ingredient){
     this.ingredients.push(ingredient);
     this.ingredientsChanged.next(this.ingredients.slice());
   }

   addIngredientsFromRecipe(ingredients: Ingredient[]){
     this.ingredients.push(...ingredients);
     this.ingredientsChanged.next(this.ingredients.slice())
   }

   onDeleteIngredientFromList(){

   }
}
