import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {MeasureTypes} from "../../shared/enums";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
   recipeForm: FormGroup;
   id: number;
   editMode = false;
   public measureTypes: MeasureTypes[] = Object.values(MeasureTypes);


   constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
   }

   ngOnInit() {
      this.route.params
         .subscribe(
            (params: Params) =>{
              this.id = +params['id'];
              this.editMode = params['id'] != null;
              this.initForm()
            }
         )
   }

   initForm(){
      let recipeEditName = '';
      let recipeEditImgPath = '';
      let recipeEditDescription = '';
      let recipeEditIngredients = new FormArray<FormGroup>([])

      if(this.editMode){
         const loadedRecipe = this.recipeService.getRecipe(this.id);
         recipeEditName = loadedRecipe.name;
         recipeEditImgPath = loadedRecipe.imgPath;
         recipeEditDescription = loadedRecipe.description
         if(loadedRecipe['ingredients']){
            for(let forIngredient of loadedRecipe.ingredients){
               recipeEditIngredients.push(
                  new FormGroup<any>({
                     'ingName': new FormControl(forIngredient.name),
                     'ingAmount': new FormControl(forIngredient.amount),
                     'dropdownMeasure': new FormControl(forIngredient.measureType)
                  })
               )
            }
         }
      }

      this.recipeForm = new FormGroup<any>({
         'recipeName': new FormControl(recipeEditName),
         'imgPath': new FormControl(recipeEditImgPath),
         'descriptionID': new FormControl(recipeEditDescription),
         'ingredients': recipeEditIngredients
      })
   }

   onSubmit(){
      console.log(this.recipeForm.value);
   }

   onDeleteIngredientFromRecipeEdit(index:number){
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
   }

   onAddIngredientButtonClick(){
      (<FormArray>this.recipeForm.get('ingredients')).push(
         new FormGroup({
            'ingName': new FormControl(),
            'ingAmount': new FormControl(),
            'dropdownMeasure': new FormControl()
         })
      )
   }

   onFormClearButtonClick(){
      this.recipeForm.reset();
   }

   get controls(){
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
   }
}
