import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path:'', component: UsuariosComponent
    }
  ])],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
