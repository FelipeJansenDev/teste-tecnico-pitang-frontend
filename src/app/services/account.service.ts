import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<any | null>;
    public user: Observable<any | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(login: string, password: string) {
      console.log(login);
      console.log(password);
        return this.http.post<any>(`${environment.apiUrl}/signin`, { login, password })
            .pipe(map(user => {
              console.log(user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', user['token']);
                this.userSubject.next(user);
              this.router.navigateByUrl("/dashboard");
              return user;
            }));
    }


  logout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }
}
