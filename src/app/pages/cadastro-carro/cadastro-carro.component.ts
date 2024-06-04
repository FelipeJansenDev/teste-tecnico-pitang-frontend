import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {first} from "rxjs/operators";
import {CarroService} from "../../services/carro.service";
import {ActivatedRoute, Router} from "@angular/router";
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
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [''],
      color: ['', Validators.required],
      licensePlate: ['', Validators.required],
      model: ['', Validators.required],
      userId: [''],
      year: ['', Validators.required]

    });
    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      if (params['id'] != null) {
        this.getCarroById(params['id']);
      }
    });
  }

  onSubmit() {
    if (!this.form.get('id')?.value) {
      console.log("Criando novo carro");
      this.cadastrarCarro();
    } else {
      console.log("Atualizando carro");
      this.atualizarCarro();
    }
  }

  private atualizarCarro() {
    this.carroService.update(this.form.get('id')?.value, this.form.value).subscribe(res => {
      this.router.navigateByUrl("/dashboard");
    }, error => {
      this.mostrarErro = true;
      this.exceptions = error.error;
    });
  }

  private cadastrarCarro() {
    this.carroService.register(this.form.value).subscribe(res => {
      this.router.navigateByUrl("/dashboard");
    }, error => {
      this.mostrarErro = true;
      this.exceptions = error.error;
    });
  }

  private getCarroById(id: any) {
    this.carroService.getById(id).subscribe(res => {
      console.log(res);
      this.form.patchValue({
        id: res.id,
        color: res.color,
        licensePlate: res.licensePlate,
        model: res.model,
        userId: res.userId,
        year: res.year
      })
    })
  }
}
