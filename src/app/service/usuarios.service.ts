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
  private urlGetUser: string =`http://127.0.0.1:8080/api/v1/usuarios/findAllUsuarios`
  private urlCreateUser: string =`http://127.0.0.1:8080/api/v1/usuarios/createUser`
  private urlDeleteUser: string =`http://127.0.0.1:8080/api/v1/usuarios/deleteById/`
  private urlEditUser: string =`http://127.0.0.1:8080/api/v1/usuarios/updateUser`

  constructor(private httpClient: HttpClient) {}

  /**
 * metodo get de httpclient que nos devuelve informacion por medio de la api
 */
   getUserById(usuacodi: string): Observable<Usuarios>{

    return this.httpClient.get<Usuarios>(this.url + usuacodi )
  }

  /**
 * metodo get de httpclient que nos devuelve informacion por medio de la api
 */
  deleteUserById(usuacodi: number): Observable<number>{

    return this.httpClient.get<number>(this.urlDeleteUser + usuacodi )
  }
   /**
 * metodo get de httpclient que nos devuelve informacion por medio de la api
 */
   createUser(user: Usuarios): Observable<Usuarios>{

    return this.httpClient.post<Usuarios>(this.urlCreateUser, user )
  }

  /**
 * metodo get de httpclient que nos devuelve informacion por medio de la api
 */
  editUser(user: Usuarios): Observable<Usuarios>{

    return this.httpClient.put<Usuarios>(this.urlEditUser, user )
  }

  /**
 * metodo get de httpclient que nos devuelve informacion por medio de la api
 */
  getUser(): Observable<Usuarios[]>{

    return this.httpClient.get<Usuarios[]>(this.urlGetUser )
  }
}


