import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";

@Injectable(
   {
      providedIn: 'root'
   }
)
export class DataStorageService{
   constructor(private httpVar: HttpClient, private recipeService: RecipeService) {
   }

   saveRecipesToDB(){
      const recipes = this.recipeService.getRecipes();
      this.httpVar.put('https://recipebook-7b7be-default-rtdb.firebaseio.com/recipes.json', recipes)
         .subscribe(response => {
            console.log(response);
         });
   }

   fetchRecipesFromDB(){
      this.httpVar.get<Recipe[]>('https://recipebook-7b7be-default-rtdb.firebaseio.com/recipes.json')
         .subscribe(recipesFromSub=>{
            console.log(recipesFromSub);
            this.recipeService.setRecipes(recipesFromSub);
         })
   };
}
