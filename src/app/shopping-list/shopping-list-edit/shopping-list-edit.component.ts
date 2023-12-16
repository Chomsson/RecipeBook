import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {MeasureTypes} from "../../shared/enums";
import {NgForm, FormsModule, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy{
   public measureTypes = Object.values(MeasureTypes);
   editingSubscription: Subscription;

   constructor(public shoppingListService: ShoppingListService) {
   }

   ngOnInit() {
      this.editingSubscription = this.shoppingListService.editingStarted
         .subscribe();
   }

   ngOnDestroy() {
      this.editingSubscription.unsubscribe();
   }

   onIngredientSubmit(form: NgForm){
      this.shoppingListService.addIngredient(form.value);
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
