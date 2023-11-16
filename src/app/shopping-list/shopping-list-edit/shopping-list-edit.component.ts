import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {MeasureTypes} from "../../shared/enums";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
   @ViewChild('nameInput') nameInputReference: ElementRef;
   @ViewChild('amountInput') amountInputReference: ElementRef;
   @ViewChild('measureInput') measureInputReference: ElementRef;
   public measureTypes = Object.values(MeasureTypes);

   constructor(private shoppingListService: ShoppingListService) {
   }
   AddIngredientToList(){
      const newIngredient = new Ingredient(
         this.nameInputReference.nativeElement.value,
         this.amountInputReference.nativeElement.value,
         this.measureInputReference.nativeElement.value)
      this.shoppingListService.addIngredient(newIngredient);
   }
}
