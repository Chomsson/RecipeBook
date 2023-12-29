import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
    selectedForDetail: Recipe;
    idOfRecipe: number;
    ingredientAlert: boolean = false;

    constructor(private recipeService: RecipeService,
                  private route: ActivatedRoute,
                  private router: Router) {
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
         (this.selectedForDetail.ingredients);
      this.ingredientAlert=true;

      setTimeout(()=>{this.ingredientAlert = false;}
         ,2000)
   }

   // onEditRecipeSelect(){
   //     this.router.navigate(['edit'], {relativeTo: this.route});
   // }

   onDeleteSelect(indexToDelete: number){
       this.recipeService.deleteRecipe(indexToDelete);
       this.router.navigate(['recipes']).then(()=>{
          console.log("Recipe of number "+this.idOfRecipe+" deleted!")
       });
   }
}
