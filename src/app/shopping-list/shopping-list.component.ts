import {Component, Input} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
    ingredients: Ingredient[] = [
        new Ingredient("cebula", 2),
        new Ingredient("burak", 3)
    ];

   onIngredientAddedFromEdit(ingFromEvent: Ingredient){
      this.ingredients.push(ingFromEvent);
   }
}
