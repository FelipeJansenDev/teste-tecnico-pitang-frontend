import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,

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

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
        },
        error: error => {
        }
      });
  }

}
