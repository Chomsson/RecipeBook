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
    @Input() index: number;

    // onItemSelected(){
    //   this.recipeService.recipeSelected.emit(this.recipeItemVar);
    // }
   // zastapione routingiem po ID

   @HostBinding('style.border') bgc: string;

   @HostListener('mouseover', ['$event'])
   private onMouseOver(){
      this.bgc = '1px solid blue';
   }

   @HostListener('mouseout', ['$event'])
   private onMouseOut():void {
      this.bgc = '';
   }
}
