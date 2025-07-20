// src/app/dashboard/group/group.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Cambiar el nombre de la interfaz para evitar conflicto con la clase
type GroupItem = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-group',
  standalone: false,
  templateUrl: './group.html',
  styleUrls: ['./group.scss']
})
export class Group {
  groups: GroupItem[] = [];
  form: FormGroup;
  nextId = 1;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // Getter para facilitar acceso al control
  get nameControl() {
    return this.form.get('name');
  }

  addGroup(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const name: string = this.nameControl?.value.trim();
    this.groups.push({ id: this.nextId++, name });
    this.form.reset();
  }

  deleteGroup(id: number): void {
    this.groups = this.groups.filter(g => g.id !== id);
  }

  goToBoard(groupId: number): void {
    this.router.navigate(['/board', groupId]);
  }

  // trackBy para optimizar ngFor
  trackByGroup(index: number, group: GroupItem): number {
    return group.id;
  }
}
