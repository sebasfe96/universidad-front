import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Usuarios } from '../domain/usuarios';


@Injectable({
  providedIn: 'root'
})
/**
 * service donde consumimos las apis enviando la respuesta para devolver los datos
 */
export class UsuariosService {

  private url: string =`http://127.0.0.1:8080/api/v1/usuarios/getById/`
  constructor(private httpClient: HttpClient) {}

  /**
 * metodo get de httpclient que nos devuelve informacion por medio de la api
 */
   getUserById(usuacodi: string): Observable<Usuarios>{

    return this.httpClient.get<Usuarios>(this.url + usuacodi )
  }
}


