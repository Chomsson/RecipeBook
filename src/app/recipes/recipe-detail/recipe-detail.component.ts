import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
    selectedForDetail: Recipe;
    idOfRecipe: number;

    constructor(private recipeService: RecipeService,
                  private route: ActivatedRoute) {
    }

    ngOnInit(){
       this.route.params
          .subscribe(
             (params: Params) =>
             {this.idOfRecipe = +params['id'];
             this.selectedForDetail = this.recipeService.getRecipe(this.idOfRecipe);}
          )
    }

   addIngredientsToShoppingList(){
      this.recipeService
         .addIngredientsToShoppingListServ
         (this.selectedForDetail.ingredients)
   }
}
