import { Component } from '@angular/core';
import { Usuario } from 'app/models/Usuário';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listaUsuarios: Usuario[] = [];

  constructor(private storageService: StorageService) { }

  async buscarUsuarios() {
    this.listaUsuarios = await this.storageService.getAll();
  }

  ionViewWillEnter() {
    this.buscarUsuarios();
  }

  async excluirRegistro(email: string){
    await this.storageService.remove(email);
    this.buscarUsuarios();
  }


}
