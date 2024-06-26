import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {AccountService} from "../../services/account.service";
import {Exception} from "../../model/exception";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit{
  form!: FormGroup;
  exceptions: Exception[] = [];
  mostrarErro = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', [Validators.required, Validators.minLength(6)]],
      login: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.accountService.register(this.form.value).subscribe(res => {
      this.router.navigateByUrl("/login");
    }, error => {
      this.mostrarErro = true;
      this.exceptions = error.error;
    });
  }

}
