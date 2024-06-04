import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
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
   //editMode = false;
   public measureTypes: MeasureTypes[] = Object.values(MeasureTypes);


   constructor(private route: ActivatedRoute, public recipeService: RecipeService, private router: Router) {
   }

   ngOnInit() {
      this.route.params
         .subscribe(
            (params: Params) =>{
              this.idOfSelectedRecipe = +params['id'];
              this.recipeService.editMode = params['id'] != null;
              this.initForm();
            }
         )
   }

   initForm(){
      let recipeEditName = '';
      let recipeEditImgPath = 'assets/vegvisir.jpg';
      let recipeEditDescription = '';
      let recipeEditIngredients = new FormArray<FormGroup>([])

      if(this.recipeService.editMode){
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
      if(this.recipeService.editMode){
         this.recipeService.updateRecipeFromEditPage(this.idOfSelectedRecipe, this.recipeForm.value);
         // this.router.navigate(['../'], {relativeTo: this.route});
      }else{
         this.recipeService.addRecipeFromEditPage(this.recipeForm.value);
      }
      this.onFormClearButtonClick();
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
      if(this.recipeService.editMode){
         this.router.navigate(['../'], {relativeTo: this.route});
      }
      else{
         this.recipeForm.reset();
         this.recipeForm.patchValue({
            'imgPath': 'assets/vegvisir.jpg'
         })
         this.recipeService.editMode = false;
      }
   }

   get controls(){
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
   }
}


//
// min="1"
// oninput="validity.valid||(value='');"
//    [pattern]="'^[1-9]+[0-9]*$'"
