import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
   @ViewChild('nameInput') nameInputReference: ElementRef;
   @ViewChild('amountInput') amountInputReference: ElementRef;
   @Output() addedIng = new EventEmitter<Ingredient>();
   AddIngredientToList(){
      const newIngredient = new Ingredient(this.nameInputReference.nativeElement.value, this.amountInputReference.nativeElement.value);
      this.addedIng.emit(newIngredient);
   }
}
