import {Component, EventEmitter, HostBinding, HostListener, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {MeasureTypes} from "../../shared/enums";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
    // @Output() listItemSelected = new EventEmitter<Recipe>();   <-- przeniesione do service
    recipes: Recipe[];
    constructor(private recipeService: RecipeService) {
    }

    ngOnInit() {
       this.recipes = this.recipeService.getRecipes()
    }

   // onListItemSelected(forItem: Recipe){
   //      this.listItemSelected.emit(forItem);
   //  }   przeniesione do service


}
