import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errorPassword: boolean = false;
  errorConexion: boolean = false;
  usuario: string = "";
  s: string = "";
  username: string = "";
  password: string = "";

  constructor(public auth: AuthService, private http: HttpClient, private router: Router,@Inject(DOCUMENT) private document: Document) {
    
    const parts = this.document.location.href.split('/');
    if(parts[parts.length - 1]=='error'){
      this.errorPassword=true;
    } else if(parts[parts.length - 1]=='error-conn'){
      this.errorConexion=true;
    }
   }

  ngOnInit() {
    localStorage.clear()

    console.log(localStorage.getItem('nombre'))
  }

  async login() {
    this.usuario = (<HTMLInputElement>document.getElementById("usuario")).value;
    this.password = (<HTMLInputElement>document.getElementById("password")).value;
    this.auth.post(this.usuario, this.password);
  }


}
