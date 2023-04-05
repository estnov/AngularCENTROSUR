import { Component } from '@angular/core';
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
  password: string = "";

  constructor(public auth: AuthService) { }

  ngOnInit() {

  }

  async loggin() {
    this.usuario = (<HTMLInputElement>document.getElementById("usuario")).value;
    this.password = (<HTMLInputElement>document.getElementById("password")).value;
    console.log(this.auth.login(this.usuario, this.password));
  }

  


}
