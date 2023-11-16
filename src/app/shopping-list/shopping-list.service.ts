import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {MeasureTypes} from "../shared/enums";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

   ingredientsChanged= new EventEmitter<Ingredient[]>();
   private ingredients: Ingredient[] = [
      new Ingredient("cebula", 2, MeasureTypes.kg),
      new Ingredient("burak", 3, MeasureTypes.kg)
   ];
  constructor() { }

   getIngredients(){
     return this.ingredients.slice();
   }

   addIngredient(ingredient: Ingredient){
     this.ingredients.push(ingredient);
     this.ingredientsChanged.emit(this.ingredients.slice());
   }
}
