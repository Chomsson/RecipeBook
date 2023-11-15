import {Component, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
    @Output() listItemSelected = new EventEmitter<Recipe>();
    recipes: Recipe[] = [
        new Recipe('kebab box', 'bez surówek hehe mordo', 'assets/kebab-box.jpg'),
        new Recipe('burger', 'fat burger', 'assets/burger.avif'),
    ];

    onListItemSelected(forItem: Recipe){
        this.listItemSelected.emit(forItem);
    }


}
