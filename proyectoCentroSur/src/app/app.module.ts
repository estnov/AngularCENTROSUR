import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; 

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { BOrdenesComponent } from './Components/b-ordenes/b-ordenes.component';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { ModificarComponent } from './Components/modificar/modificar.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BOrdenesComponent,
    ModificarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
