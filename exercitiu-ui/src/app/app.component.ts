import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'exerciutiuAC';
  public items: any = []; // aici tinem lista de items care vor fi afisate in todo list
  public isInEditMode: boolean = false;
  public selectedForEdit: any = {};
  public inputText : String = "";

  public constructor(private todoService: TodoService) {
    // am injectat TodoService
    // nimic altceva de facut in constructor
  }

  public ngOnInit(): void {
    this.inputText = "";
    this.todoService.getItemList().subscribe((response) => {
      this.items = response; // raspunsul contine lista de items
                             // fiecare item are forma { id: number, name: string } 
    });
  }
  
  public onCreateItem(newItemName: string): void {
    this.todoService.createItem({todo: newItemName}).subscribe((response: any) => {
      this.items.push({name: newItemName, id: response.id}); // cand requestul a fost facut cu succes si am primit raspunsul, push-uim itemul in lista impreuna cu id-ul din raspuns
                                                             // o alta varianta ar fi sa facem refresh la toata lista cu getItemList(). 
    });
  }

  public onDeleteItem(itemId: number): void {
    this.todoService.deleteItem(itemId).subscribe(() => {
      this.items = this.items.filter((item) => item.id != itemId);
     });
  }

  public onDeleteAllItems(): void {
    this.todoService.deleteAllItems().subscribe(() => {
      this.items = [];
     });
  }

  public onToggleEditMode(item): void {
    if(this.isInEditMode) {
      this.inputText = "";
    }
    this.isInEditMode = !this.isInEditMode;
    if(this.isInEditMode) {
      this.selectedForEdit = item;
      this.inputText = this.selectedForEdit.name;
    }
  }

  public onEditItem(newName): void {
    this.todoService.editItem(newName, this.selectedForEdit.id).subscribe((response: any) => {
        this.items.map((item, index) => {
          if(item.id == this.selectedForEdit.id) {
            item.name = newName;
          }
        })
    });
    this.isInEditMode = false;
    this.inputText = "";
  }
}
