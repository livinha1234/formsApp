import { Component, OnInit } from '@angular/core';
import { CpfValidators } from '../validators/cpf-Validators';
import { comparaValidators } from '../validators/compara-Validators';
import { Usuario } from '../models/Usuário';
import { StorageService } from '../services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formRegistro: FormGroup;
  usuario: Usuario = new Usuario();

  mensagens = {
    nome: [
      { tipo: 'required', mensagens: 'O campo Nome é obrigatório.' },
      {
        tipo: 'minlength',
        mensagens: 'O nome deve ter pelo menos 3 caracteres.',
      },
    ],
    cpf: [
      { tipo: 'required', mensagens: 'O campo CPF é obrigatório.' },
    ],
    email: [
      { tipo: 'required', mensagens: 'O campo E-mail é obrigatório.' },
      { tipo: 'email', mensagens: 'E-mail Inválido.' },
    ],
    senha: [
      { tipo: 'required', mensagens: 'É obrigatório confirmar senha.' },
      {
        tipo: 'minlength',
        mensagens: 'A senha deve ter pelo menos 6 caracteres.',
      },
      {
        tipo: 'maxlength',
        mensagens: 'A senha deve ter no máximo 8 caractéres.',
      },
    ],
    confirmaSenha: [
      { tipo: 'required', mensagens: 'É obrigatório confirmar senha.' },
      {
        tipo: 'minlength',
        mensagens: 'A senha deve ter pelo menos 6 caracteres.',
      },
      {
        tipo: 'maxlength',
        mensagens: 'A senha deve ter no máximo 8 caractéres.',
      },
      { tipo: 'comparacao', mensagens: 'Deve ser igual a Senha.' },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private route: Router
  ) {
    this.formRegistro = this.formBuilder.group(
      {
        nome: [
          '',
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        cpf: [
          '',
          Validators.compose([Validators.required]),
        ],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        senha: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(8),
          ]),
        ],
        confirmaSenha: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(8),
          ]),
        ],
      },
      {
        validator: comparaValidators('senha', 'confirmaSenha'),
      }
    );
  }

  ngOnInit(): void {}

  async salvarRegistro() {
    if (this.formRegistro.valid) {
      this.usuario.nome = this.formRegistro.value.nome;
      this.usuario.cpf = this.formRegistro.value.cpf;
      this.usuario.email = this.formRegistro.value.email;
      this.usuario.senha = this.formRegistro.value.senha;
      await this.storageService.set(this.usuario.email, this.usuario);
      this.route.navigateByUrl('/tabs/tab1');
    } else {
      alert('Formulário Inválido!');
    }
  }
}
