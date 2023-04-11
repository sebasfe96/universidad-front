import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '', component: AppLayoutComponent,
      children: [
          { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
          { path: 'usuarios', loadChildren: () => import('./components/usuarios/usuarios.module').then(m => m.UsuariosModule) },
          
      ]
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
