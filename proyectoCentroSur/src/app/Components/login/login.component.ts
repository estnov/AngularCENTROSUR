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

  async loggin() {
    this.usuario = (<HTMLInputElement>document.getElementById("usuario")).value;
    this.password = (<HTMLInputElement>document.getElementById("password")).value;
    console.log(this.auth.postLogin(this.usuario, this.password));
  }

  

  postLogin(username : String, password : String) {
    let parser = new DOMParser();
    let xmlString = '<?xml version="1.0" encoding="utf-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">  <soapenv:Header/>   <soapenv:Body><urn:ZISUWM_WEB_LOGIN><PASSWORD>Israel123</PASSWORD><USUARIO>ADMIN</USUARIO></urn:ZISUWM_WEB_LOGIN></soapenv:Body> </soapenv:Envelope>';
    
    let doc = parser.parseFromString(xmlString, "application/xml");

    console.log(doc);

    let headers = new HttpHeaders()
      .set('Content-Type', 'text/xml')
      .set('charset', 'utf-8');

    return new Promise(resolve => {
      this.http.post("http://p15isudessap1.cisnergia.gob.ec:8000/sap/bc/srt/rfc/sap/zws_web_login/110/zws_web_login/zws_web_login", doc, {headers: headers}).subscribe(data => {
        resolve(data);
        console.log(data);
        console.log(this.xmlStringToJson(data.toString()));
        alert("LLEGO A ESTE METODO -------->"+ data)
      }, err => {
        console.log(err);
        alert("ERROR ---->"+ err.value)
      });
    });
  }
  xmlStringToJson(arg0: string): any {
    throw new Error('Method not implemented.');
  }
  


}
