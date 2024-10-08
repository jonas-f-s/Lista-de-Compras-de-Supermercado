import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  pendente: string[] = [];
  concluido: string[] = [];
  novoItem: string = '';
  editando: boolean = false;
  itemEditandoIndex: number | null = null;

  constructor() {
    this.carregarTarefas();
  }

  adicionarItem() {
    if (this.novoItem.trim()) {
      this.pendente.push(this.novoItem);
      this.novoItem = '';
      this.atualizarLocalStorage();
    }
  }

  concluirItem(index: number) {
    const [item] = this.pendente.splice(index, 1);
    this.concluido.push(item);
    this.atualizarLocalStorage();
  }

  excluirItem(index: number, lista: 'pendente' | 'concluido') {
    if (lista === 'pendente') {
      this.pendente.splice(index, 1);
    } else {
      this.concluido.splice(index, 1);
      this.atualizarLocalStorage();
    }
  }

  editarItem(index: number) {
    this.novoItem = this.pendente[index];
    this.editando = true;
    this.itemEditandoIndex = index;
  }

  atualizarItem() {
    if (this.itemEditandoIndex !== null && this.novoItem.trim()) {
      this.pendente[this.itemEditandoIndex] = this.novoItem;
      this.novoItem = '';
      this.editando = false;
      this.itemEditandoIndex = null;
    this.atualizarLocalStorage();
    }
  }

  carregarTarefas() {
    const tarefasArmazendas = localStorage.getItem('tarefas')
    if (tarefasArmazendas) {
      const {pendente, concluido} = JSON.parse(tarefasArmazendas);
      this.pendente = pendente || [];
      this.concluido = concluido || [];
    }
  }

  atualizarLocalStorage() {
    const tarefas = {
      pendente: this.pendente,
      concluido: this.concluido
    };
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  }
}

