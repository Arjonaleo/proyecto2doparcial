import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../board/board';

@Component({
  selector: 'app-task-card',
  standalone: false,
  templateUrl: './task-card.html',
  styleUrls: ['./task-card.scss']
})
export class TaskCard {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<number>();
  // @Output() edit = new EventEmitter<Task>(); // opcional

  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  // onEdit(): void {
  //   this.edit.emit(this.task);
  // }
}