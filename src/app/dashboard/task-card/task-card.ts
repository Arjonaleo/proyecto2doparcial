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
  @Output() view = new EventEmitter<Task>();  // ✅ Nuevo output para ver detalles

  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  onView(): void {
    this.view.emit(this.task);  // ✅ Emitimos la tarea actual
  }
}
