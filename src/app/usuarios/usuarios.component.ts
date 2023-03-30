import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuarios } from '../domain/usuarios';
import { UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnDestroy, OnInit {

  usuacodi: string = ""
  usuarios: Usuarios = new Usuarios

  constructor(private service: UsuariosService) { }

  ngOnDestroy(): void {

  }
  ngOnInit(): void {

  }

  getUser(): void {
console.log("aquisebas")
    this.service.getUserById(this.usuacodi).subscribe(data => {
      this.usuarios = data
      console.log(data)
    })
  }
}
