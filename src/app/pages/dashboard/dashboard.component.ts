import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {CarroService} from "../../services/carro.service";
import {Carro} from "../../model/carro";
import {Exception} from "../../model/exception";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  private accountService: AccountService;

  private carroService: CarroService;

  carros: Carro[] = [];

  mostrarMensagemDeSucesso = false;
  mostrarMensagemDeErro = false;

  exceptions: Exception[] = [];
  mensagemDeSucesso: string = "";

  constructor(
    accountService: AccountService,
    carroService: CarroService
  ) {
    this.accountService = accountService;
    this.carroService = carroService;
  }

  ngOnInit() {
    this.getCarros();
  }

  getCarros() {
    this.carroService.getAll().subscribe(data => {
      this.carros = data;
    });
  }

  logout() {
    this.accountService.logout();
  }

  deletarCarro(id: number) {
    this.carroService.delete(id).subscribe(data => {
      this.mostrarMensagemDeSucesso = true;
      this.mensagemDeSucesso = "Carro deletado com sucesso!";
      this.getCarros();
    }, error => {
      this.mostrarMensagemDeErro = true
      this.exceptions = error.error;
    });
  }
}
