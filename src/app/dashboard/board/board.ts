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

  // Para mostrar en un modal la tarea seleccionada
  selectedTask: Task | null = null;
  private storageKey!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el ID del grupo desde la URL
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
    this.storageKey = `group-${this.groupId}-tasks`;

    // Cargar columnas desde localStorage (si existe), o inicializar por defecto
    const saved = this.loadTasksFromStorage();
    if (saved) {
      this.columns = saved;
    } else {
      this.columns = [
        { name: 'To Do',       tasks: [] },
        { name: 'In Progress', tasks: [] },
        { name: 'Hot Fix',     tasks: [] },
        { name: 'Done',        tasks: [] }
      ];
    }
  }

  /**
   * Agrega una tarea completa (Task) a la columna indicada, y guarda estado
   */
  addTask(columnIndex: number, task: Task): void {
    this.columns[columnIndex].tasks.push(task);
    this.saveTasksToStorage();
  }

  /**
   * Elimina una tarea por ID de la columna indicada, y guarda estado
   */
  deleteTask(columnIndex: number, taskId: number): void {
    this.columns[columnIndex].tasks = this.columns[columnIndex].tasks
      .filter(t => t.id !== taskId);
    this.saveTasksToStorage();
  }

  /**
   * Abre la vista de detalle (modal) de una tarea
   */
  onViewTask(task: Task): void {
    this.selectedTask = task;
  }

  /**
   * Cierra el modal de detalle de tarea
   */
  closeTaskView(): void {
    this.selectedTask = null;
  }

  /**
   * trackBy para optimizar ngFor de columnas
   */
  trackByColumn(index: number, col: Column): string {
    return col.name;
  }

  /**
   * trackBy para optimizar ngFor de tareas
   */
  trackByTask(index: number, task: Task): number {
    return task.id;
  }

  /**
   * Guarda en localStorage el arreglo completo de columnas con sus tareas
   */
  private saveTasksToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.columns));
  }

  /**
   * Carga desde localStorage el arreglo de columnas, o null si no existe
   */
  private loadTasksFromStorage(): Column[] | null {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) as Column[] : null;
  }
}

