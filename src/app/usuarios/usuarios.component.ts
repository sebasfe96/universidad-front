import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuarios } from '../domain/usuarios';
import { UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
/**
 * componente encargado de la logica de los usuarios
 */
export class UsuariosComponent implements OnDestroy, OnInit {

  usuacodi: string = ""
  usuarios: Usuarios = new Usuarios

  constructor(private service: UsuariosService) { }
/**
 * componente encargado de destruir las subscripciones
 */
  ngOnDestroy(): void {

  }
  /**
 * se encarga de correr una sola vez al carga la pagina
 */
  ngOnInit(): void {

  }

/**
 * metodo que se encarga de tomar el documento y cargarlo para ser enviado al service
 */
  getUser(): void {
console.log("aquisebas")
    this.service.getUserById(this.usuacodi).subscribe(data => {
      this.usuarios = data
      console.log(data)
    })
  }
}
