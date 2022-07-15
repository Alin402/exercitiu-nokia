import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @Input() public itemList = [];
  @Input() public isInEditMode;
  @Input() public selectedForEdit;
  @Input() public inputText;
  @Output() public deleteItem = new EventEmitter<number>();
  @Output() public deleteAllItems = new EventEmitter();
  @Output() public toggleEditMode = new EventEmitter<any>();

  constructor() { }

  public onClickDelete(itemId: number): void {
    this.deleteItem.emit(itemId); // emitem un eveniment care contine id-ul itemului ce il vom sterge
  }

  public onDeleteAllItems(): void {
    this.deleteAllItems.emit();
  }

  public onToggleEditMode(item): void {
    this.toggleEditMode.emit(item);
  }
}
