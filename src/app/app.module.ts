import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {HeaderComponent} from './header/header.component';
import {RecipeItemComponent} from './recipes/recipe-list/recipe-item/recipe-item.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {ShoppingListEditComponent} from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

@NgModule({
   declarations: [
      AppComponent,
      ShoppingListComponent,
      RecipesComponent,
      RecipeListComponent,
      HeaderComponent,
      RecipeItemComponent,
      RecipeDetailComponent,
      ShoppingListEditComponent,
      RecipeStartComponent,
      RecipeEditComponent
   ],
   imports: [
      BrowserModule,
      NgbModule,
      DropdownModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule {
}
