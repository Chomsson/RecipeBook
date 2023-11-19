import {Component, Input} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
    @Input() selectedForDetail: Recipe;

    constructor(private recipeService: RecipeService) {
    }

   addIngredientsToShoppingList(){
      this.recipeService
         .addIngredientsToShoppingListServ
         (this.selectedForDetail.ingredients)
   }
}
