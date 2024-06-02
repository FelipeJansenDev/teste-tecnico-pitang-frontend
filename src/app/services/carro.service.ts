import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Observable} from "rxjs";
import {Carro} from "../model/carro";

@Injectable({ providedIn: 'root' })
export class CarroService {

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Carro[]> {
    return this.http.get<any>(`${environment.apiUrl}/cars`);
  }

  register(car: any) {
    return this.http.post<any>(`${environment.apiUrl}/cars`, car);
  }
}
