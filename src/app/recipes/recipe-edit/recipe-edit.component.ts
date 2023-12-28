import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {MeasureTypes} from "../../shared/enums";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
   recipeForm: FormGroup;
   idOfSelectedRecipe: number;
   editMode = false;
   public measureTypes: MeasureTypes[] = Object.values(MeasureTypes);


   constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
   }

   ngOnInit() {
      this.route.params
         .subscribe(
            (params: Params) =>{
              this.idOfSelectedRecipe = +params['id'];
              this.editMode = params['id'] != null;
              this.initForm();
            }
         )
   }

   initForm(){
      let recipeEditName = '';
      let recipeEditImgPath = 'assets/vegvisir.jpg';
      let recipeEditDescription = '';
      let recipeEditIngredients = new FormArray<FormGroup>([])

      if(this.editMode){
         const loadedRecipe = this.recipeService.getRecipe(this.idOfSelectedRecipe);
         recipeEditName = loadedRecipe.name;
         recipeEditImgPath = loadedRecipe.imgPath;
         recipeEditDescription = loadedRecipe.description
         if(loadedRecipe['ingredients']){
            for(let forIngredient of loadedRecipe.ingredients){
               recipeEditIngredients.push(
                  new FormGroup<any>({
                     'name': new FormControl(forIngredient.name, Validators.required),
                     'amount': new FormControl(forIngredient.amount
                        ,[Validators.required,
                           Validators.min(1),
                           Validators.pattern("^[1-9]+[0-9]*$")
                        ]),
                     'measureType': new FormControl(forIngredient.measureType,
                        Validators.required)
                  })
               )
            }
         }
      }

      this.recipeForm = new FormGroup<any>({
         'name': new FormControl(recipeEditName, Validators.required),
         'imgPath': new FormControl(recipeEditImgPath),
         'description': new FormControl(recipeEditDescription),
         'ingredients': recipeEditIngredients
      })
   }

   onSubmit(){
      // console.log(this.recipeForm.value);
      if(this.editMode){
         this.recipeService.updateRecipeFromEditPage(this.idOfSelectedRecipe, this.recipeForm.value)
      }else{
         this.recipeService.addRecipeFromEditPage(this.recipeForm.value);
      }

   }

   onDeleteIngredientFromRecipeEdit(index:number){
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
   }

   onAddIngredientButtonClick(){
      (<FormArray>this.recipeForm.get('ingredients')).push(
         new FormGroup({
            'name': new FormControl(null, Validators.required),
            'amount': new FormControl(null, [Validators.required,
               Validators.min(1),
               Validators.pattern("^[1-9]+[0-9]*$")
            ]),
            'measureType': new FormControl(null, Validators.required)
         })
      )
   }

   onFormClearButtonClick(){
      this.recipeForm.reset();
      this.editMode = false;
   }

   get controls(){
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
   }
}


//
// min="1"
// oninput="validity.valid||(value='');"
//    [pattern]="'^[1-9]+[0-9]*$'"
