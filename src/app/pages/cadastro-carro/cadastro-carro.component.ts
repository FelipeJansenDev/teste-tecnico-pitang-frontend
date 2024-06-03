import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {first} from "rxjs/operators";
import {CarroService} from "../../services/carro.service";
import {Router} from "@angular/router";
import {Exception} from "../../model/exception";

@Component({
  selector: 'app-cadastro-carro',
  templateUrl: './cadastro-carro.component.html',
  styleUrl: './cadastro-carro.component.css'
})
export class CadastroCarroComponent implements OnInit{
  form!: FormGroup;
  exceptions: Exception[] = [];
  mostrarErro = false;

  constructor(
    private formBuilder: FormBuilder,
    private carroService: CarroService,
    private router: Router,

  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      color: ['', Validators.required],
      licensePlate: ['', Validators.required],
      model: ['', Validators.required],
    });
  }

  onSubmit() {
    this.carroService.register(this.form.value).subscribe(res => {
      this.router.navigateByUrl("/dashboard");
    }, error => {
      this.mostrarErro = true;
      this.exceptions = error.error;
    });
  }

  protected readonly external = external;
}
