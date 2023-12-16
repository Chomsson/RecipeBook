import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {MeasureTypes} from "../../shared/enums";
import {NgForm, FormsModule, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
   public measureTypes = Object.values(MeasureTypes);
   tempIng: Ingredient;

   constructor(public shoppingListService: ShoppingListService) {
   }

   onIngredientSubmit(form: NgForm){
      this.tempIng = form.value;
      console.log(this.tempIng);
      this.shoppingListService.addIngredient(this.tempIng);
   }

}





// AddIngredientToList(){
// const newIngredient = new Ingredient(
// this.nameInputReference.nativeElement.value,
// this.amountInputReference.nativeElement.value,
// this.measureInputReference.nativeElement.value)
// this.shoppingListService.addIngredient(newIngredient);
// }

// @ViewChild('ingredientForm') ingForm = NgForm;
// @ViewChild('nameInput') nameInputReference: ElementRef;
// @ViewChild('amountInput') amountInputReference: ElementRef;
// @ViewChild('measureInput') measureInputReference: ElementRef;
