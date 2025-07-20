// src/app/dashboard/board/board.ts 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface Task {
  id: number;
  title: string;
  description?: string;
  assignee?: string;
  status: 'sin empezar' | 'terminada' | 'aprobada';
}

interface Column {
  name: string;
  tasks: Task[];
}

@Component({
  selector: 'app-board',
  standalone: false,
  templateUrl: './board.html',
  styleUrls: ['./board.scss']
})
export class Board implements OnInit {
  groupId!: number;
  columns: Column[] = [];
  private nextTaskId = 1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el ID del grupo desde la ruta
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));

    // Inicializar columnas predefinidas
    this.columns = [
      { name: 'To Do', tasks: [] },
      { name: 'In Progress', tasks: [] },
      { name: 'Hot Fix', tasks: [] },
      { name: 'Done', tasks: [] }
    ];
  }

  // Agregar una nueva tarea a una columna
  addTask(columnIndex: number, title: string): void {
    const task: Task = {
      id: this.nextTaskId++,
      title: title.trim(),
      description: 'Descripción por defecto',
      assignee: 'Sin asignar',
      status: 'sin empezar'
    };
    this.columns[columnIndex].tasks.push(task);
  }

  // Eliminar tarea por ID
  deleteTask(columnIndex: number, taskId: number): void {
    this.columns[columnIndex].tasks = this.columns[columnIndex].tasks.filter(task => task.id !== taskId);
  }

  // Para mejorar el rendimiento al iterar en *ngFor
  trackByColumn(index: number, col: Column): string {
    return col.name;
  }

  trackByTask(index: number, task: Task): number {
    return task.id;
  }
}
