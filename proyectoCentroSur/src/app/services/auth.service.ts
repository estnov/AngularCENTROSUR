import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { catchError, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  errorPassword: boolean = false;
  
  constructor(private http: HttpClient, private router: Router) { 

  }



  post(user: string, password: string){
    const soapUrl = 'api/post/json';
    const xml = `<?xml version="1.0" encoding="utf-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
       <soapenv:Header/>
       <soapenv:Body>
          <urn:ZISUWM_WEB_LOGIN>
             <PASSWORD>`+password+`</PASSWORD>
             <USUARIO>`+user+`</USUARIO>
          </urn:ZISUWM_WEB_LOGIN>
       </soapenv:Body>
    </soapenv:Envelope>`;


    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'charset': 'utf-8'
    });

    this.http.post(soapUrl, xml, { headers: headers, responseType: 'text' }).subscribe(response => {
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response, 'text/xml');

      // Retrieve the user attributes
      const nombre = xmlDoc.getElementsByTagName('NOMBRE')[0].textContent;
      const tipo = xmlDoc.getElementsByTagName('TIPO')[0].textContent;

      if(nombre!=''){
        this.router.navigate(['/', 'ordenes']);
        localStorage.setItem('nombre',''+nombre);
        localStorage.setItem('tipo',''+tipo);
        localStorage.setItem('user',''+user);
        localStorage.setItem('password',''+password);
      } else {
        this.errorPassword = true;
        this.router.navigate(['/', 'error'])      
      }
    });
  }




} 
