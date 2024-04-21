import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss',
})
export class CellComponent {
  @Input()
  state: boolean = true;
  @Output() stateEmitter = new EventEmitter<boolean>();
  die() {
    this.state = false;
  }
  live() {
    this.state = true;
  }
  toggleState() {
    this.state = !this.state;
    this.stateEmitter.emit(this.state);
  }
}
