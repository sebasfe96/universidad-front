import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Usuarios } from '../domain/usuarios';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url: string =`http://127.0.0.1:8080/api/v1/usuarios/getById/`
  constructor(private httpClient: HttpClient) {}

   getUserById(usuacodi: string): Observable<Usuarios>{

    return this.httpClient.get<Usuarios>(this.url + usuacodi )
  }
}


