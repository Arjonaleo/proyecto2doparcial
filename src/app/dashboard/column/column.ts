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
  @Output() add = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<number>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title:       ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      assignee:    ['', [Validators.required, Validators.minLength(3)]],
      status:      ['sin empezar', [Validators.required]]
    });
  }

  // Getters para facilitar el acceso y validaciones
  get titleControl()    { return this.form.get('title'); }
  get descControl()     { return this.form.get('description'); }
  get assigneeControl() { return this.form.get('assignee'); }
  get statusControl()   { return this.form.get('status'); }

  onAdd(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newTask: Task = {
      id:          Date.now(),  // ID único simple
      title:       this.titleControl!.value.trim(),
      description: this.descControl!.value.trim(),
      assignee:    this.assigneeControl!.value.trim(),
      status:      this.statusControl!.value as 'sin empezar' | 'terminada' | 'aprobada'
    };

    this.add.emit(newTask);

    // Reiniciar formulario, dejando el estado por defecto
    this.form.reset({ status: 'sin empezar' });
  }

  onDelete(taskId: number): void {
    this.delete.emit(taskId);
  }

  trackByTask(index: number, task: Task): number {
    return task.id;
  }
}
