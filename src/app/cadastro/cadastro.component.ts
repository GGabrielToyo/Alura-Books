import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultaCepService } from '../service/consulta-cep.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private router: Router, private serviceConsultaCep: ConsultaCepService) { }

  ngOnInit(): void {
  }

  consultaCep(e: any, form: NgForm) {

    if(e.target.value) {
      return this.serviceConsultaCep.getConsultaCep(e.target.value).subscribe(endereco => {
        this.autoCompleteEndereco(endereco, form);
      });
    } else {
      return console.log("Cep inválido!");
    }
    
  }

  autoCompleteEndereco(endereco: any, f: NgForm) {
      f.form.patchValue({
        endereco: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
        complemento: endereco.complemento,
        uf: endereco.uf,
        estado: endereco.cep
      });
  }

  cadastrar(form: NgForm) {
    if (form.valid) {
      this.router.navigate(["./sucesso"]);
    } 
  }

}
