import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: "todo-input",
    templateUrl : "./todo-input.component.html",
    styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent{
    @Input() public isInEditMode;
    @Input() public selectedForEditMode;
    @Input() public inputText : String;

    @Output() public addItem = new EventEmitter();
    @Output() public editItem = new EventEmitter<String>();

    public onClickAdd(): void {
        if(this.isInEditMode) {
            this.editItem.emit(this.inputText);
        } else {
            this.addItem.emit(this.inputText);
        }
        this.inputText = "";
    }
}
