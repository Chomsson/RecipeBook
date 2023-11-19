import {Component, EventEmitter, HostBinding, HostListener, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {MeasureTypes} from "../../shared/enums";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
    // @Output() listItemSelected = new EventEmitter<Recipe>();   <-- przeniesione do service
    recipes: Recipe[];
    constructor(
       private recipeService: RecipeService,
       private router: Router,
       private route: ActivatedRoute) {
    }

    ngOnInit() {
       this.recipes = this.recipeService.getRecipes()
    }

   // onListItemSelected(forItem: Recipe){
   //      this.listItemSelected.emit(forItem);
   //  }   przeniesione do service

   onNewRecipe(){
       this.router.navigate(['new'], {relativeTo: this.route})
   }

}
