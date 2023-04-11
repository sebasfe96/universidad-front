import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuarios } from '../../domain/usuarios';
import { UsuariosService } from '../../service/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [MessageService]
})
/**
 * componente encargado de la logica de los usuarios
 */
export class UsuariosComponent implements OnDestroy, OnInit {

  usuacodi: string = ""

  subUser: Subscription = new Subscription
  userSelect: Usuarios = new Usuarios

  usuarios: Usuarios = new Usuarios
  userForm : FormGroup

  lstUsuarios: Usuarios[] = new Array

  displayCreate: boolean = false
  edit: boolean = false

  campana: any[] = new Array
  estadoUser: any[] = new Array

  constructor(private service: UsuariosService, private messageService: MessageService,
    private confirmationService: ConfirmationService) {

    this.campana = [{ value: 1, name: "fedex" }, { value: 2, name: "justeat" }]
    this.estadoUser = [{ value: 1, name: "Activo" }, { value: 0, name: "Inactivo" }]
    this.userForm = new FormGroup({
      usuacodi: new FormControl('', Validators.required),
      usuanomb: new FormControl('', Validators.required),
      usuaedad: new FormControl('', Validators.required),
      usuatele: new FormControl('', Validators.required),
      usuaemail: new FormControl('', Validators.required),
      usuadire: new FormControl('', Validators.required),
      usuacamp: new FormControl('', Validators.required),
      usuaesta: new FormControl('', Validators.required),
    })
  }

  /**
   * componente encargado de destruir las subscripciones
   */
  ngOnDestroy(): void {

  }
  /**
 * se encarga de correr una sola vez al carga la pagina
 */
  ngOnInit(): void {
    this.getUser()
  }

  /**
   * metodo que se encarga de tomar el documento y cargarlo para ser enviado al service
   */
  getUser(): void {
    this.subUser = this.service.getUser().subscribe({
      next: data => {
        this.lstUsuarios = data
      }, error: error => {

      }, complete: () => {

      }
    })
  }

  showDisplayCreate(): void {
    this.userSelect = new Usuarios
    this.edit= false
    this.displayCreate = true
  }

  showDisplayEdit(user: Usuarios): void {
    this.userSelect = user
    this.cargaForm()
    this.edit= true
    this.displayCreate = true
  }


  estadoCamp(campaña: number): string {

    let result: string = ""
    if (campaña == 1) {
      result = "fedex"
    }
    else if (campaña == 2) {
      result = "justeat"
    }
    return result;
  }

  estado(estado: number): string {

    let result: string = ""
    if (estado == 1) {
      result = "Activo"
    }
    else if (estado == 0) {
      result = "Inactivo"
    }
    return result;
  }

  confirmarCreateUser(): void {
    this.confirmationService.confirm({
      message: '¿Estas seguro que deseas guardar este usuario?',
      header: 'Create Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.createUser()
       
      }, key: 'createUser'
    })
  }

  createUser(): void {
    //if (this.userForm.valid) {
      this.userSelect.usuacodi = Number(this.userForm.controls['usuacodi'].value)
      this.userSelect.usuanomb = String(this.userForm.controls['usuanomb'].value)
      this.userSelect.usuaedad = Number(this.userForm.controls['usuaedad'].value)
      this.userSelect.usuaemail = String(this.userForm.controls['usuaemail'].value)
      this.userSelect.usuadire = String(this.userForm.controls['usuadire'].value)
      this.userSelect.usuatele = String(this.userForm.controls['usuatele'].value)
      this.userSelect.usuacamp = Number(this.userForm.controls['usuacamp'].value)
      this.userSelect.usuaesta = Number(this.userForm.controls['usuaesta'].value)

      this.service.createUser(this.userSelect).subscribe({
        next: data => {
          if (data != null) {
            console.log("aquisebas")
            this.showSuccess("Usuario creado")
            this.displayCreate = false
            this.getUser()
          } else {
            console.log("aquisebas2")
            this.showError("error creando usuario")
          }
        }, error: error => {

        }, complete: () => {

        },
      })

    /*} else {
      this.validaCampos()
    }*/

  }

  confirmarEliminarUser(user: Usuarios): void {
    this.confirmationService.confirm({
      message: '¿Estas seguro que deseas eliminar este usuario?',
      header: 'Eliminar Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.eliminarUser(Number(user.usuacodi))
       
      }, key: 'eliminarUser'
    })
  }

  eliminarUser(usuacodi: number):void{

    this.service.deleteUserById(Number(usuacodi)).subscribe({next: data =>{

      if(data ==1){
        this.showSuccess("Eliminado Correctamente")
        this.getUser()
      }else{
        this.showError("Error al eliminar")
      }
    }, error: error =>{

    }, complete:() => {
        
    },})

  }

  confirmarEditUser(): void {
    this.confirmationService.confirm({
      message: '¿Estas seguro que deseas editar este usuario?',
      header: 'Editar Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.editarUser()
       
      }, key: 'editUser'
    })
  }

  editarUser(): void {
    //if (this.userForm.valid) {
      this.userSelect.usuacodi = Number(this.userForm.controls['usuacodi'].value)
      this.userSelect.usuanomb = String(this.userForm.controls['usuanomb'].value)
      this.userSelect.usuaedad = Number(this.userForm.controls['usuaedad'].value)
      this.userSelect.usuaemail = String(this.userForm.controls['usuaemail'].value)
      this.userSelect.usuadire = String(this.userForm.controls['usuadire'].value)
      this.userSelect.usuatele = String(this.userForm.controls['usuatele'].value)
      this.userSelect.usuacamp = Number(this.userForm.controls['usuacamp'].value)
      this.userSelect.usuaesta = Number(this.userForm.controls['usuaesta'].value)

      console.log("aquisebas : ", this.userSelect)
      this.service.editUser(this.userSelect).subscribe({
        next: data => {
          if (data != null) {
            console.log("aquisebas")
            this.showSuccess("Usuario editado")
            this.displayCreate = false
            this.getUser()
          } else {
            console.log("aquisebas2")
            this.showError("error editando usuario")
          }
        }, error: error => {

        }, complete: () => {

        },
      })

    /*} else {
      this.validaCampos()
    }*/

  }

  //------------------------------------------------------------------------------

  cargaForm():void{
    this.userForm = new FormGroup({
      usuacodi: new FormControl(String(this.userSelect.usuacodi)),
      usuanomb: new FormControl(String(this.userSelect.usuanomb)),
      usuaedad: new FormControl(String(this.userSelect.usuaedad)),
      usuatele: new FormControl(String(this.userSelect.usuatele)),
      usuaemail: new FormControl(String(this.userSelect.usuaemail)),
      usuadire: new FormControl(String(this.userSelect.usuadire)),
      usuacamp: new FormControl(String(this.userSelect.usuacamp)),
      usuaesta: new FormControl(String(this.userSelect.usuaesta)),
    })
  }

  limpiarForm():void{
    this.userForm = new FormGroup({
      usuacodi: new FormControl('', Validators.required),
      usuanomb: new FormControl('', Validators.required),
      usuaedad: new FormControl('', Validators.required),
      usuatele: new FormControl('', Validators.required),
      usuaemail: new FormControl('', Validators.required),
      usuadire: new FormControl('', Validators.required),
      usuacamp: new FormControl('', Validators.required),
      usuaesta: new FormControl('', Validators.required),
    })
  }

  validaCampos(): void {

    if (!this.userForm.controls['usuacodi'].valid) {
      this.showError("Escribir un documento")
    }
    if (!this.userForm.controls['usuanomb'].valid) {
      this.showError("Escribir un nombre")
    }
    if (!this.userForm.controls['usuaedad'].valid) {
      this.showError("Escribir una edad")
    }
    if (!this.userForm.controls['usuaemail'].valid) {
      this.showError("Escribir un correo")
    }
    if (!this.userForm.controls['usuadire'].valid) {
      this.showError("Escribir un dirección")
    }
    if (!this.userForm.controls['usuatele'].valid) {
      this.showError("Escribir un telefono")
    }
    if (!this.userForm.controls['usuacamp'].valid) {
      this.showError("Escoger una campaña")
    }
    if (!this.userForm.controls['usuaesta'].valid) {
      this.showError("Escoger un estado")
    }
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message })
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message })
  }
}
