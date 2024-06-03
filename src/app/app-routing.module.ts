import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AuthGuard} from "./config/auth.guard";
import {CadastroComponent} from "./pages/cadastro/cadastro.component";
import {CadastroCarroComponent} from "./pages/cadastro-carro/cadastro-carro.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'cadastro', component: CadastroComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'cadastro-carro', component: CadastroCarroComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
