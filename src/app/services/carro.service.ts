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
    return this.http.get<Carro[]>(`${environment.apiUrl}/cars`);
  }

  register(car: any) {
    return this.http.post<any>(`${environment.apiUrl}/cars`, car);
  }

  delete(id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/cars/${id}`);
  }

  getById(id: number): Observable<Carro> {
    return this.http.get<Carro>(`${environment.apiUrl}/cars/${id}`);
  }

  update(id: number, car: any) {
    return this.http.put<any>(`${environment.apiUrl}/cars/${id}`, car);
  }
}
