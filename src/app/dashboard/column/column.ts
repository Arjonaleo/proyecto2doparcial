import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../board/board';

@Component({
  selector: 'app-column',
  standalone: false,
  templateUrl: './column.html',
  styleUrls: ['./column.scss']
})
export class Column {
  @Input() name!: string;
  @Input() tasks: Task[] = [];

  /** Emite la nueva tarea creada */
  @Output() add = new EventEmitter<Task>();
  /** Emite el ID de la tarea a eliminar */
  @Output() delete = new EventEmitter<number>();
  /** Emite la tarea seleccionada para ver o editar */
  @Output() view = new EventEmitter<Task>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario reactivo con todos los campos
    this.form = this.fb.group({
      title:       ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      assignee:    ['', [Validators.required, Validators.minLength(3)]],
      status:      ['sin empezar', [Validators.required]]
    });
  }

  /** Getters para facilitar validación y acceso a controles */
  get titleControl()    { return this.form.get('title'); }
  get descControl()     { return this.form.get('description'); }
  get assigneeControl() { return this.form.get('assignee'); }
  get statusControl()   { return this.form.get('status'); }

  /** Crea una nueva tarea y la emite al padre (Board) */
  onAdd(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newTask: Task = {
      id:          Date.now(),  // ID único simple usando timestamp
      title:       this.titleControl!.value.trim(),
      description: this.descControl!.value.trim(),
      assignee:    this.assigneeControl!.value.trim(),
      status:      this.statusControl!.value as 'sin empezar' | 'terminada' | 'aprobada'
    };

    this.add.emit(newTask);

    // Reinicia formulario dejando el estado por defecto
    this.form.reset({ status: 'sin empezar' });
  }

  /** Elimina la tarea solicitada */
  onDelete(taskId: number): void {
    this.delete.emit(taskId);
  }

  /** Emite la tarea para que el padre la muestre en un modal o vista */
  onView(task: Task): void {
    this.view.emit(task);
  }

  /** trackBy para optimizar *ngFor en tareas */
  trackByTask(index: number, task: Task): number {
    return task.id;
  }
}
