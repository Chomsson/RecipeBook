import {Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {Recipe} from "../../recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

    @Input() recipeItemVar: Recipe;
    @Output() itemSelected = new EventEmitter<void>();

    onItemSelected(){
        this.itemSelected.emit();
    }

   @HostBinding('style.border') border: string;

   @HostListener('mouseover', ['$event'])
   private onMouseOver(){
      this.border = '2px solid blue';
   }

   @HostListener('mouseout', ['$event'])
   private onMouseOut():void {
      this.border = '';
   }
}
