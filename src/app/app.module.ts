import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from './service/usuarios.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppLayoutModule } from './layout/app.layout.module';
import { UsuariosModule } from './components/usuarios/usuarios.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';



@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    NotfoundComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AppLayoutModule,
    UsuariosModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    MessagesModule
    
    

    
    
  ],
  providers: [UsuariosService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
