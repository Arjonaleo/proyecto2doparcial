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
  @Output() add = new EventEmitter<string>();
  @Output() delete = new EventEmitter<number>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get titleControl() {
    return this.form.get('title');
  }

  onAdd(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const title = this.titleControl?.value.trim();
    this.add.emit(title);
    this.form.reset();
  }

  onDelete(taskId: number): void {
    this.delete.emit(taskId);
  }

  trackByTask(index: number, task: Task): number {
    return task.id;
  }
}