import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {Observable} from "rxjs";
import {RecipeService} from "./recipe.service";

// @Injectable(
//    {providedIn: 'root'}
// )
// export class RecipesResolverService implements ResolveFn<Recipe[]>{
//    constructor(private DSService: DataStorageService) {
//    }
//
//    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
//       this.DSService.fetchRecipesFromDB();
//    }
// }

export const RecipeResolver: ResolveFn<Recipe[]>=(
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot,
   dsStorage: DataStorageService = inject(DataStorageService)
): Observable<Recipe[]> => dsStorage.fetchRecipesFromDB();
