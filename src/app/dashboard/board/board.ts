/// src/app/dashboard/board/board.ts
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
    this.columns = [
      { name: 'To Do',       tasks: [] },
      { name: 'In Progress', tasks: [] },
      { name: 'Hot Fix',     tasks: [] },
      { name: 'Done',        tasks: [] }
    ];
  }

  /**
   * Agrega una tarea completa (Task) a la columna indicada
   */
  addTask(columnIndex: number, task: Task): void {
    this.columns[columnIndex].tasks.push(task);
  }

  /**
   * Elimina una tarea por ID de la columna indicada
   */
  deleteTask(columnIndex: number, taskId: number): void {
    this.columns[columnIndex].tasks = this.columns[columnIndex].tasks.filter(t => t.id !== taskId);
  }

  trackByColumn(index: number, col: Column): string {
    return col.name;
  }

  trackByTask(index: number, task: Task): number {
    return task.id;
  }
}

