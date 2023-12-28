import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {MeasureTypes} from "../../shared/enums";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
   id: number;
   editMode = false;
   public measureTypes: MeasureTypes[] = Object.values(MeasureTypes);


   constructor(private route: ActivatedRoute) {
   }

   ngOnInit() {
      this.route.params
         .subscribe(
            (params: Params) =>{
              this.id = +params['id'];
              this.editMode = params['id'] != null;
            }
         )
   }

}
