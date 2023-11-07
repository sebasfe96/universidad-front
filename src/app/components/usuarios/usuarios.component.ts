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
  campa: number =0
  typeUser: number = 0

  typeUserList: any[] = new Array
  estadoUser: any[] = new Array

  constructor(private service: UsuariosService, private messageService: MessageService,
    private confirmationService: ConfirmationService) {

    this.typeUserList = [{ value: 1, name: "Admin" }, { value: 2, name: "User" }]

    this.userForm = new FormGroup({
      id: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      secondName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      documentNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      userType: new FormControl('', Validators.required),
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
    this.limpiarForm()
    this.edit= false
    this.displayCreate = true
  }

  showDisplayEdit(user: Usuarios): void {
    this.userSelect = user
    this.cargaForm()
    this.edit= true
    this.displayCreate = true
  }


  typeUserSelect(type: number): string {

    let result: string = ""
    if (type == 1) {
      result = "Admin"
    }
    else if (type == 2) {
      result = "User"
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
    if (this.userForm.valid) {
      this.userSelect.firstName = String(this.userForm.controls['firstName'].value)
      this.userSelect.secondName = String(this.userForm.controls['secondName'].value)
      this.userSelect.lastName = String(this.userForm.controls['lastName'].value)
      this.userSelect.address = String(this.userForm.controls['address'].value)
      this.userSelect.documentNumber = String(this.userForm.controls['documentNumber'].value)
      this.userSelect.telephone = String(this.userForm.controls['telephone'].value)
      this.userSelect.email = String(this.userForm.controls['userType'].value)
      this.userSelect.userType = this.typeUser

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

    } else {
      this.validaCampos()
    }

  }

  confirmarEliminarUser(user: Usuarios): void {
    this.confirmationService.confirm({
      message: '¿Estas seguro que deseas eliminar este usuario?',
      header: 'Eliminar Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.eliminarUser(Number(user.id))
       
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
      this.userSelect.id = Number(this.userForm.controls['id'].value)
      this.userSelect.firstName = String(this.userForm.controls['firstName'].value)
      this.userSelect.secondName = String(this.userForm.controls['secondName'].value)
      this.userSelect.lastName = String(this.userForm.controls['lastName'].value)
      this.userSelect.address = String(this.userForm.controls['address'].value)
      this.userSelect.documentNumber = String(this.userForm.controls['documentNumber'].value)
      this.userSelect.telephone = String(this.userForm.controls['telephone'].value)
      this.userSelect.email = String(this.userForm.controls['userType'].value)
      this.userSelect.userType = this.typeUser

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
      id: new FormControl(String(this.userSelect.id)),
      firstName: new FormControl(String(this.userSelect.firstName)),
      secondName: new FormControl(String(this.userSelect.secondName)),
      lastName: new FormControl(String(this.userSelect.lastName)),
      email: new FormControl(String(this.userSelect.email)),
      address: new FormControl(String(this.userSelect.address)),
      documentNumber: new FormControl(String(this.userSelect.documentNumber)),
      telephone: new FormControl(String(this.userSelect.telephone)),
    })
  }

  limpiarForm():void{
    this.userForm = new FormGroup({
      id: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      secondName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      documentNumber: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
    })
  }

  validaCampos(): void {

    if (!this.userForm.controls['firstName'].valid) {
      this.showError("Escribir el primer nombre")
    }
    if (!this.userForm.controls['secondName'].valid) {
      this.showError("Escribir uel segundo nombre")
    }
    if (!this.userForm.controls['email'].valid) {
      this.showError("Escribir un correo")
    }
    if (!this.userForm.controls['address'].valid) {
      this.showError("Escribir un dirección")
    }
    if (!this.userForm.controls['telephone'].valid) {
      this.showError("Escribir un telefono")
    }
    if (!this.userForm.controls['lastName'].valid) {
      this.showError("Escribir tus apellidos")
    }
    if (!this.userForm.controls['documentNumber'].valid) {
      this.showError("Escribir tu documento de identidad")
    }
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message })
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message })
  }
}
