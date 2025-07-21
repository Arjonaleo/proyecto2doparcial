import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../board/board';

@Component({
  selector: 'app-task-card',
  standalone: false,
  templateUrl: './task-card.html',
  styleUrls: ['./task-card.scss']
})
export class TaskCard {
  /** Recibe la tarea a mostrar */
  @Input() task!: Task;

  /** Emite el ID de la tarea a eliminar */
  @Output() delete = new EventEmitter<number>();

  /** Emite la tarea completa para ver o editar */
  @Output() view = new EventEmitter<Task>();

  /** Llamado por el botón “×”: emite solo el ID */
  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  /** Llamado al hacer click en la tarjeta: emite la tarea */
  onView(): void {
    this.view.emit(this.task);
  }
}
