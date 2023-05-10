import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  
  constructor(private http: HttpClient, private router: Router) { }



  list(): Observable<any>{
    const soapUrl = 'listado/post/json';
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
        <soapenv:Header/>
        <soapenv:Body>
          <urn:ZISUWM_GET_ORDENES>
              <ESTADO>01</ESTADO>
              <PASSWORD>`+localStorage.getItem('password')+`</PASSWORD>
              <USUARIO>`+localStorage.getItem('user')+`</USUARIO>
          </urn:ZISUWM_GET_ORDENES>
        </soapenv:Body>
    </soapenv:Envelope>`;


    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'charset': 'utf-8',
      'Authorization': 'Basic ' + btoa('jperalta' + ':' + 'Franjua.4095')
    });

    return (this.http.post(soapUrl, xml, { headers: headers, responseType: 'text' }));

  }


  

}
