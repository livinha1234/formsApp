import { Component, OnInit } from '@angular/core';
import { CpfValidators } from '../validators/cpf-Validators';
import { comparaValidators } from '../validators/compara-Validators';
import { Usuario } from '../models/Usuário';
import { StorageService } from '../services/storage.service';
import{FormBuilder , FormGroup, Validators}from'@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formRegistro: FormGroup;
  Usuario:Usuario= new Usuario();

mensagens={
  mensagens = {
    nome: [
      { tipo: 'required', mensagem: 'O campo Nome é obrigatório.' },
      { tipo: 'minlength', mensagem: 'O nome deve ter pelo menos 3 caracteres.' },
    ],
    cpf: [
      { tipo: 'required', mensagem: 'O campo CPF é obrigatório.' },
      { tipo: 'invalido', mensagem: 'CPF Inválido.' },
    ],
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório.' },
      { tipo: 'email', mensagem: 'E-mail Inválido.' },
    ],
    senha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.', },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 8 caractéres.' },
    ],
    confirmaSenha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.', },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 8 caractéres.' },
      { tipo: 'comparacao', mensagem: 'Deve ser igual a Senha.' },
    ],
  },

  constructor(private formBuilder: FormBuilder,private StorageService:StorageService) {
    this.formRegistro=this.formBuilder.group({

      nome:['',Validators.compose([Validators.required,Validators.minLength(3)])],
      cpf:['',Validators.compose([Validators.required,CpfValidators.cpfValido])],
      email:['',Validators.compose([Validators.required,Validators.email])],
      senha:['',Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(8)])],
      confirmaSenha:['',Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(8)])]

},{
  validator:comparaValidators('senha','confirmaSenha')
})
  }

ngOnInit() {
  }

  async salvarRegistro(){
    if(this.formRegistro.valid){
      this.Usuario.nome=this.formRegistro.value.nome;
      this.Usuario.cpf=this.formRegistro.value.cpf;
      this.Usuario.email=this.formRegistro.value.email;
      this.Usuario.senha=this.formRegistro.value.senha;
      await this.StorageService .set(this.Usuario.email,this.Usuario)
    }else{
      alert('Formulário Inválido!')

    }
  }

}
}
