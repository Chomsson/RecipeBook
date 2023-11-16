import {Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {Recipe} from "../../recipe.model";
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

    @Input() recipeItemVar: Recipe;

    constructor(private recipeService: RecipeService) {
    }
    onItemSelected(){
      this.recipeService.recipeSelected.emit(this.recipeItemVar);
    }

   @HostBinding('style.border') border: string;

   @HostListener('mouseover', ['$event'])
   private onMouseOver(){
      this.border = '1px solid blue';
   }

   @HostListener('mouseout', ['$event'])
   private onMouseOut():void {
      this.border = '';
   }
}
