import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errorUsuario: boolean = false;
  errorPassword: boolean = false;
  errorConexion: boolean = false;
  usuario: string = "";
  s: string = "";
  username: string = "";
  password: string = "";

  constructor(public auth: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {

  }

  async login() {
    this.usuario = (<HTMLInputElement>document.getElementById("usuario")).value;
    this.password = (<HTMLInputElement>document.getElementById("password")).value;
    console.log(this.auth.postLogin(this.usuario, this.password));
  }

  



}
