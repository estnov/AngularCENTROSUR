import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { BOrdenesComponent } from './Components/b-ordenes/b-ordenes.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'ordenes', component: BOrdenesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
