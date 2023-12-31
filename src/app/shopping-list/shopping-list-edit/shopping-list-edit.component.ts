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
   @ViewChild('ingredientForm') formVar: NgForm;
   public measureTypes = Object.values(MeasureTypes);
   editingSubscription: Subscription;
   editingStarted = false;
   editingItemIndex: number;
   editingItemInfo: Ingredient;

   constructor(public shoppingListService: ShoppingListService) {
   }

   ngOnInit() {
      this.editingSubscription = this.shoppingListService.editingStarted
         .subscribe((index: number)=>{
               this.editingItemIndex = index;
               this.editingStarted = true;
               this.editingItemInfo = this.shoppingListService.getIngredient(index);
               this.formVar.setValue({
                  name: this.editingItemInfo.name,
                  amount: this.editingItemInfo.amount,
                  measureType: this.editingItemInfo.measureType
               })
            }
         );
   }

   ngOnDestroy() {
      this.editingSubscription.unsubscribe();
   }

   onIngredientSubmit(form: NgForm){
      if(!this.editingStarted){
      this.shoppingListService.addIngredient(form.value);
      }
      else{
         this.shoppingListService.updateIngredient(this.editingItemIndex, form.value);
         }
      this.editingStarted = false;
      this.formVar.reset();
   }

   onDeleteIngredientButtonClick(){
      this.formVar.reset();
      this.editingStarted = false;
      this.shoppingListService.onDeleteIngredientFromList(this.editingItemIndex);
   }

   onClearFormButtonClick(){
      this.formVar.reset();
      this.editingStarted = false;
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
