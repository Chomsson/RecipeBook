import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

    ingredients: Ingredient[];
    private ingredientsChangedSubscription: Subscription;

    constructor(private shoppingListService: ShoppingListService) {
    }
    ngOnInit() {
       this.ingredients = this.shoppingListService.getIngredients();
       this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged
          .subscribe(
             (ingredientsMethod: Ingredient[])=>{
                this.ingredients = ingredientsMethod;
             }
          );
    }

   ngOnDestroy(): void {
       this.ingredientsChangedSubscription.unsubscribe();
   }

   onEditIngredient(index: number){
      this.shoppingListService.editingStarted.next(index);
   }



   // onIngredientAddedFromEdit(ingFromEvent: Ingredient){
   //    this.ingredients.push(ingFromEvent);
   // }  <-- w serwisie

}
