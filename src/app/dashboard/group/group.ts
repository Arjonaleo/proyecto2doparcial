import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Cambiar el nombre de la interfaz para evitar conflicto con la clase
interface GroupItem {
  id: number;
  name: string;
}

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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  addGroup() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const name = this.form.value.name.trim();
    this.groups.push({ id: this.nextId++, name });
    this.form.reset();
  }

  deleteGroup(id: number) {
    this.groups = this.groups.filter(g => g.id !== id);
  }
}
