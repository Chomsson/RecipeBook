import {Component, EventEmitter, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    // @Output() viewSelected = new EventEmitter<string>();
    // onSelectView(featureFromTemplate:string){
    //     this.viewSelected.emit(featureFromTemplate);
    // }
   constructor(private dsService: DataStorageService) {
   }

   onSaveDataClick(){
      this.dsService.saveRecipesToDB();
   }

   onFetchDataClick(){
      this.dsService.fetchRecipesFromDB().subscribe();
   }
}
