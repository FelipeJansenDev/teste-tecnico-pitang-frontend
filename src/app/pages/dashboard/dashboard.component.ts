import { Component } from '@angular/core';
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  logout() {
    this.accountService.logout();
  }
}
